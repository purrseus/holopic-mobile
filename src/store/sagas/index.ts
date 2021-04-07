import { fork } from 'redux-saga/effects';
import auth from './auth';
import user from './user';
import photo from './photo';
import newestPhoto from './newest-photo';
import followingPhoto from './following-photo';
import searchSaga from './search';

function* rootSaga() {
  yield fork(auth);
  yield fork(user);
  yield fork(photo);
  yield fork(newestPhoto);
  yield fork(followingPhoto);
  yield fork(searchSaga);
}

export default rootSaga;
