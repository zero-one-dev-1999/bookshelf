import { createSlice } from '@reduxjs/toolkit'
import { IAuth } from './types'

const initialState: IAuth = {
	user: null,
	isAuth: false,
	isLoading: false,
	apiError: null,
}

const { actions, reducer } = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, { payload }) {
			state.user = payload
		},
		setAuth(state, { payload }) {
			state.isAuth = payload
		},
		setIsLoading(state, { payload }) {
			state.isLoading = payload
		},
		setApiError(state, { payload }) {
			state.apiError = payload.toString()
		},
		reset(state) {
			state.user = initialState.user
			state.isAuth = initialState.isAuth
		},
	},
})

export { actions as authActions, reducer as default }
