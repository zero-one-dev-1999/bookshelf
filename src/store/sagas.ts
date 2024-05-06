import { all, spawn } from 'redux-saga/effects'
import booksSaga from './book/saga'
import authSaga from './auth/saga'

function* rootSaga() {
	yield all([spawn(booksSaga), spawn(authSaga)])
}

export default rootSaga
