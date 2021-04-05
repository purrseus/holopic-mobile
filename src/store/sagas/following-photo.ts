import { getFollowingPhotos, IPhoto } from '@services/photo';
import { followingPhotoActions } from '@store/slices/following-photo';
import { RootState } from '@store/store';
import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';

function* handleGetFollowingPhotoRequest() {
  try {
    const response: AxiosResponse<IPhoto[]> = yield call(getFollowingPhotos, 1);

    yield put(followingPhotoActions.getFollowingPhotosSuccess(response.data));
  } catch (error) {
    yield put(followingPhotoActions.getFollowingPhotosFailed());
  }
}

function* handleGetMoreFollowingPhotoRequest() {
  const { photos, full }: { photos: IPhoto[]; full: boolean } = yield select(
    (state: RootState) => state.followingPhoto,
  );

  if (full || photos.length < 20) {
    return;
  }

  const nextPage = Math.floor(photos.length / 20) + 1;

  try {
    const response: AxiosResponse<IPhoto[]> = yield call(
      getFollowingPhotos,
      nextPage,
    );

    yield put(
      followingPhotoActions.getMoreFollowingPhotosSuccess(response.data),
    );
  } catch (error) {
    yield put(followingPhotoActions.getMoreFollowingPhotosFailed());
  }
}

function* followingPhotoSaga() {
  yield takeLatest(
    followingPhotoActions.getFollowingPhotosRequest.type,
    handleGetFollowingPhotoRequest,
  );
  yield takeLatest(
    followingPhotoActions.getMoreFollowingPhotosRequest.type,
    handleGetMoreFollowingPhotoRequest,
  );
}

export default followingPhotoSaga;
