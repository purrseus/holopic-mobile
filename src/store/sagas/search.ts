import { PayloadAction } from '@reduxjs/toolkit';
import { searchPhotos } from '@services/photo';
import { searchUsers } from '@services/user';
import { searchActions } from '@store/slices/search';
import { all, call, takeLatest, put } from 'redux-saga/effects';

function* handleSearchKeywordRequest({ payload }: PayloadAction<string>) {
  try {
    const { usersResponse, photosResponse } = yield all({
      usersResponse: call(searchUsers, payload, 1),
      photosResponse: call(searchPhotos, payload, 1),
    });

    yield put(
      searchActions.searchKeywordSuccess({
        users: usersResponse.data,
        photos: photosResponse.data,
      }),
    );
  } catch (error) {
    yield put(searchActions.searchKeywordFailed());
  }
}

function* searchSaga() {
  yield takeLatest(
    searchActions.searchKeywordRequest.type,
    handleSearchKeywordRequest,
  );
}

export default searchSaga;
