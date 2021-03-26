import { getMyPhotos, IPhoto } from '@services/photo';
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

function* photoSaga() {
  yield takeLatest(
    photoActions.getMyPhotosRequest.type,
    handleGetMyPhotosRequest,
  );
  yield takeLatest(
    photoActions.getMoreMyPhotosRequest.type,
    handleGetMoreMyPhotosRequest,
  );
}

export default photoSaga;
