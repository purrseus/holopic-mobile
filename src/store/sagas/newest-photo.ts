import { getNewPhotos, IPhoto } from '@services/photo';
import { newestPhotoActions } from '@store/slices/newest-photo';
import { RootState } from '@store/store';
import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';

function* handleGetNewestPhotoRequest() {
  try {
    const response: AxiosResponse<IPhoto[]> = yield call(getNewPhotos, 1);

    yield put(newestPhotoActions.getNewestPhotosSuccess(response.data));
  } catch (error) {
    yield put(newestPhotoActions.getNewestPhotosFailed());
  }
}

function* handleGetMoreNewestPhotoRequest() {
  const { photos, full }: { photos: IPhoto[]; full: boolean } = yield select(
    (state: RootState) => state.newestPhoto,
  );

  if (full || photos.length < 20) {
    return;
  }

  const nextPage = Math.floor(photos.length / 20) + 1;

  try {
    const response: AxiosResponse<IPhoto[]> = yield call(
      getNewPhotos,
      nextPage,
    );

    yield put(newestPhotoActions.getMoreNewestPhotosSuccess(response.data));
  } catch (error) {
    yield put(newestPhotoActions.getMoreNewestPhotosFailed());
  }
}

function* newestPhotoSaga() {
  yield takeLatest(
    newestPhotoActions.getNewestPhotosRequest.type,
    handleGetNewestPhotoRequest,
  );
  yield takeLatest(
    newestPhotoActions.getMoreNewestPhotosRequest.type,
    handleGetMoreNewestPhotoRequest,
  );
}

export default newestPhotoSaga;
