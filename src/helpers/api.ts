/* eslint-disable prettier/prettier */
import { store } from 'store'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { authActions } from 'store/auth/reducer'
// import { authActions } from 'store/auth/reducer'

const API_URL = import.meta.env.VITE_API_URL
const api = axios.create({ baseURL: '/api', withCredentials: true })

api.interceptors.request.use(config => {
	if (config.withCredentials) {
		const { Auth } = store.getState()

		if (Auth?.isAuth) {
			let str = String(config.method).toUpperCase() + config.url
			if (config.data) {
				str += JSON.stringify(config.data)
			}
			str += Auth?.user?.secret
			const key = Auth?.user?.key
			const sign = CryptoJS.MD5(str).toString()

			config.headers.set('key', key)
			config.headers.set('sign', sign)
		}
	}

	return config
})

api.interceptors.response.use(
	response => {
		if (!(response.data instanceof Blob)) {
			if (!response.data.isOk) {
				alert('Error')
			}
		}

		return response
	},
	error => {
		if (error.response?.status === 401) {
			store.dispatch(authActions.reset())
		}

		return Promise.reject(error)
	},
)

export { API_URL, api as default }
