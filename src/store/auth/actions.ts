import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER_USER } from './action-types'

export const authLoginAction = (payload: any) => ({
	payload,
	type: AUTH_LOGIN,
})

export const authLogoutAction = () => ({
	type: AUTH_LOGOUT,
})

export const authRegisterUserAction = (payload: any) => ({
	payload,
	type: AUTH_REGISTER_USER,
})
