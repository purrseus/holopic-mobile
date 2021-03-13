import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { REHYDRATE } from 'redux-persist';
import { RootState } from '@store/store';
import { authActions } from '@store/slices/auth';
import { AuthStatus, HoloScreen } from '@constants';
import { PayloadAction } from '@reduxjs/toolkit';
import { commonActions } from '@store/slices/common';
import { getNavigation } from '@navigators/navigation-ref';
import { IToken, loginWithPhoneNumber } from '@services/holopic-api';
import { AxiosResponse } from 'axios';
import { data, setToken } from '@services';
import i18n from 'i18next';

function* handleVerifyTokenRequest() {
  const { showWelcomeScreen, refreshToken } = yield select(
    (state: RootState) => state.auth,
  );

  if (showWelcomeScreen) {
    yield put(authActions.changeAuthStatus(AuthStatus.FIST_TIME_LOGIN));
    return;
  }

  if (!refreshToken && !showWelcomeScreen) {
    yield put(authActions.changeAuthStatus(AuthStatus.UNAUTHORIZED));
    return;
  }
  data.refreshToken = refreshToken;

  yield put(authActions.changeAuthStatus(AuthStatus.LOGGED_IN));
}

function* handleVerifyPhoneNumberRequest({ payload }: PayloadAction<string>) {
  try {
    yield put(commonActions.showOverlayLoading());
    const { dialCode } = yield select(
      (state: RootState) => state.auth.phonePrefix,
    );
    const phoneNumber: string = dialCode + payload;

    const firebaseAuth: FirebaseAuthTypes.Module = yield call(auth);
    const confirmation: FirebaseAuthTypes.ConfirmationResult = yield call(
      [firebaseAuth, firebaseAuth.signInWithPhoneNumber],
      phoneNumber,
    );

    yield put(authActions.verifyPhoneNumberSuccess());
    getNavigation()?.navigate(HoloScreen.VERIFY_OTP, { phoneNumber });
    yield handleVerifyOTPRequest(confirmation);
  } catch (error) {
    yield put(authActions.verifyPhoneNumberFailed());
    yield put(
      commonActions.showToast({ message: i18n.t('authCommonErrorMessage') }),
    );
  } finally {
    yield put(commonActions.hideOverlayLoading());
  }
}

function* handleVerifyOTPRequest(
  confirmation: FirebaseAuthTypes.ConfirmationResult,
) {
  yield put(commonActions.hideOverlayLoading());
  while (true) {
    const verifyOTPCodeAction: PayloadAction<string> = yield take(
      authActions.verifyOTPCodeRequest.type,
    );
    try {
      yield put(commonActions.showOverlayLoading());

      const userCredential: FirebaseAuthTypes.UserCredential = yield call(
        [confirmation, confirmation.confirm],
        verifyOTPCodeAction.payload,
      );
      const { token }: FirebaseAuthTypes.IdTokenResult = yield call([
        userCredential.user,
        userCredential.user.getIdTokenResult,
      ]);
      const response: AxiosResponse<IToken> = yield call(loginWithPhoneNumber, {
        idToken: token,
      });

      yield put(authActions.loginSuccess(response.data.token.refreshToken));
      setToken(response.data.token.accessToken);
      data.refreshToken = response.data.token.refreshToken;
      yield put(authActions.changeAuthStatus(AuthStatus.LOGGED_IN));
    } catch (error) {
      yield put(authActions.loginFailed());
      yield put(
        // commonActions.showToast({ message: 'Invalid code', duration: 3000 }),
        commonActions.showToast({ message: i18n.t('authCommonErrorMessage') }),
      );
    } finally {
      yield put(commonActions.hideOverlayLoading());
    }
  }
}

function* authSaga() {
  yield takeLatest(REHYDRATE, handleVerifyTokenRequest);
  yield takeLatest(
    authActions.verifyPhoneNumberRequest.type,
    handleVerifyPhoneNumberRequest,
  );
}

export default authSaga;
