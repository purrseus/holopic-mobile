import { put, select, takeLatest } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';
import { RootState } from '@store/store';
import { authActions } from '@store/slices/auth';
import { AuthStatus } from '@constants';

function* handleVerifyTokenRequest() {
  const { showWelcomeScreen, refreshToken } = yield select(
    (state: RootState) => state.auth,
  );

  if (showWelcomeScreen) {
    yield put(authActions.changeAuthStatus(AuthStatus.FIST_TIME_LOGIN));
  }

  if (!refreshToken && !showWelcomeScreen) {
    yield put(authActions.changeAuthStatus(AuthStatus.UNAUTHORIZED));
  }
}

function* authSaga() {
  yield takeLatest(REHYDRATE, handleVerifyTokenRequest);
}

export default authSaga;
