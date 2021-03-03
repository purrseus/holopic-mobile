import { fork } from 'redux-saga/effects';
import auth from './auth';

function* rootSaga() {
  yield fork(auth);
}

export default rootSaga;
