import { HoloScreen } from '@constants';
import { getNavigation } from '@navigators/navigation-ref';
import { PayloadAction } from '@reduxjs/toolkit';
import { changeAvatar } from '@services/photo';
import { editProfile, getMyAccount, IAccount } from '@services/user';
import { commonActions } from '@store/slices/common';
import { IEditProfilePayloadAction, userActions } from '@store/slices/user';
import { AxiosResponse } from 'axios';
import i18n from 'i18next';
import { call, put, takeLatest } from 'redux-saga/effects';

function* handleGetUserRequest() {
  try {
    const response: AxiosResponse<IAccount> = yield call(getMyAccount);
    yield put(userActions.getUserSuccess(response.data));
  } catch (error) {
    yield put(userActions.getUserFailed());
  }
}

function* handleEditProfileRequest({
  payload,
}: PayloadAction<IEditProfilePayloadAction>) {
  try {
    yield put(commonActions.showOverlayLoading());

    if (payload.newAvatar && typeof payload.publicId === 'string') {
      yield call(changeAvatar, payload.publicId, payload.newAvatar);
    }

    yield call(editProfile, payload.values);

    yield put(userActions.getUserRequest());
    getNavigation()?.navigate(HoloScreen.TAB_BAR, {
      screen: HoloScreen.MY_PROFILE,
    });
    yield put(
      commonActions.showToast({
        message: 'Your profile has been updated',
        duration: 4000,
      }),
    );
  } catch (error) {
    yield put(userActions.editProfileFailed());
    yield put(
      commonActions.showToast({
        message: JSON.stringify(error.message) || i18n.t('commonErrorMessage'),
        duration: 4000,
      }),
    );
  } finally {
    yield put(commonActions.hideOverlayLoading());
  }
}

function* userSaga() {
  yield takeLatest(userActions.getUserRequest.type, handleGetUserRequest);
  yield takeLatest(
    userActions.editProfileRequest.type,
    handleEditProfileRequest,
  );
}

export default userSaga;
