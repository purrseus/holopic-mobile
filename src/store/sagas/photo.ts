import { HoloScreen } from '@constants';
import { getNavigation } from '@navigators/navigation-ref';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getMyPhotos,
  getLikedPhotos,
  IPhoto,
  deletePhoto,
} from '@services/photo';
import { commonActions } from '@store/slices/common';
import { photoActions } from '@store/slices/photo';
import { RootState } from '@store/store';
import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';

function* handleGetMyPhotosRequest() {
  try {
    const response: AxiosResponse<IPhoto[]> = yield call(getMyPhotos, 1);
    yield put(photoActions.getMyPhotosSuccess(response.data));
  } catch (error) {
    yield put(photoActions.getMyPhotosFailed());
  }
}

function* handleGetMoreMyPhotosRequest() {
  const totalPhotos: number | undefined = yield select(
    (state: RootState) => state.user.user?.images,
  );
  const currentPhotos: number = yield select(
    (state: RootState) => state.photo.myPhotos.photos.length,
  );

  if (totalPhotos === currentPhotos || currentPhotos < 20) {
    return;
  }

  try {
    const nextPage: number = Math.floor(currentPhotos / 20) + 1;
    const response: AxiosResponse<IPhoto[]> = yield call(getMyPhotos, nextPage);
    yield put(photoActions.getMoreMyPhotosSuccess(response.data));
  } catch (error) {
    yield put(photoActions.getMoreMyPhotosFailed());
  }
}

function* handleGetLikedPhotosRequest() {
  try {
    const response: AxiosResponse<IPhoto[]> = yield call(getLikedPhotos, 1);
    yield put(photoActions.getLikedPhotosSuccess(response.data));
  } catch (error) {
    yield put(photoActions.getLikedPhotosFailed());
  }
}

function* handleGetMoreLikedPhotosRequest() {
  const { full, photos } = yield select(
    (state: RootState) => state.photo.likedPhotos,
  );

  if (full || photos.length < 20) {
    return;
  }

  const currentPhotos: number = yield select(
    (state: RootState) => state.photo.likedPhotos.photos.length,
  );

  try {
    const nextPage: number = Math.floor(currentPhotos / 20) + 1;
    const response: AxiosResponse<IPhoto[]> = yield call(
      getLikedPhotos,
      nextPage,
    );
    yield put(photoActions.getMoreLikedPhotosSuccess(response.data));
  } catch (error) {
    yield put(photoActions.getMoreLikedPhotosFailed());
  }
}

function* handleDeletePhotoRequest({ payload }: PayloadAction<string>) {
  try {
    yield put(commonActions.showOverlayLoading());

    yield call(deletePhoto, payload);
    yield put(photoActions.deletePhotoSuccess(payload));
    getNavigation()?.navigate(HoloScreen.TAB_BAR, {
      screen: HoloScreen.MY_PROFILE,
    });
    yield put(commonActions.showToast({ message: 'Deleted!', duration: 4000 }));
  } catch (error) {
    yield put(photoActions.deletePhotoFailed());
  } finally {
    yield put(commonActions.hideOverlayLoading());
  }
}

function* photoSaga() {
  yield takeLatest(
    photoActions.getMyPhotosRequest.type,
    handleGetMyPhotosRequest,
  );
  yield takeLatest(
    photoActions.getMoreMyPhotosRequest.type,
    handleGetMoreMyPhotosRequest,
  );
  yield takeLatest(
    photoActions.getLikedPhotosRequest.type,
    handleGetLikedPhotosRequest,
  );
  yield takeLatest(
    photoActions.getMoreLikedPhotosRequest.type,
    handleGetMoreLikedPhotosRequest,
  );
  yield takeLatest(
    photoActions.deletePhotoRequest.type,
    handleDeletePhotoRequest,
  );
}

export default photoSaga;
