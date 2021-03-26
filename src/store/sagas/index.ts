import { fork } from 'redux-saga/effects';
import auth from './auth';
import user from './user';
import photo from './photo';

function* rootSaga() {
  yield fork(auth);
  yield fork(user);
  yield fork(photo);
}

export default rootSaga;
