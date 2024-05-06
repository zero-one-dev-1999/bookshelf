import { call, put, takeLeading } from 'redux-saga/effects'
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER_USER } from './action-types'
import { authActions } from './reducer'
import { AUTH_LOGIN_URL, AUTH_REGISTER_URL } from 'helpers/urls'
import api from 'helpers/api'

function* authLoginSaga({ payload }: any) {
	try {
		yield put(authActions.setIsLoading(true))

		const { data: response } = yield call(api.post, AUTH_LOGIN_URL, payload, { withCredentials: false })

		if (response.isOk) {
			yield put(authActions.setUser(response.data.user))
			yield put(authActions.setAuth(true))
		}
	} catch (error) {
		yield put(authActions.setApiError(error))
	} finally {
		yield put(authActions.setIsLoading(false))
	}
}

function* authRegisterUserSaga({ payload }: any) {
	try {
		yield put(authActions.setIsLoading(true))

		const { data: response } = yield call(api.post, AUTH_REGISTER_URL, payload, { withCredentials: false })

		if (response.isOk) {
			yield put(authActions.setUser(response.data))
			yield put(authActions.setAuth(true))
		}
	} catch (error) {
		yield put(authActions.setApiError(error))
	} finally {
		yield put(authActions.setIsLoading(false))
	}
}

function* authLogoutSaga() {
	yield put(authActions.reset())
}

function* authSaga() {
	yield takeLeading(AUTH_LOGIN, authLoginSaga)
	yield takeLeading(AUTH_LOGOUT, authLogoutSaga)
	yield takeLeading(AUTH_REGISTER_USER, authRegisterUserSaga)
}

export default authSaga
