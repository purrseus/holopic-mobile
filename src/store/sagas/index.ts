import { fork } from 'redux-saga/effects';
import auth from './auth';
import user from './user';

function* rootSaga() {
  yield fork(auth);
  yield fork(user);
}

export default rootSaga;
