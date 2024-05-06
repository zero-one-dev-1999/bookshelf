import { createSlice } from '@reduxjs/toolkit'
import { IBookReducer } from './types'

const initialState: IBookReducer = {
	data: [],
	view: null,
	search: '',
	loadings: {
		data: false,
		form: false,
	},
	apiError: null,
	form: {
		values: null,
		isUpdate: false,
		isOpen: false,
	},
}

const { actions, reducer } = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setData(state, { payload }) {
			state.data = payload
		},
		addData(state, { payload }) {
			state.data = [{ status: 0, book: payload }, ...state.data]
		},
		updateData(state, { payload }) {
			state.data = [...state.data].map(item => {
				if (item.book.id === payload.book.id) {
					return payload
				}
				return item
			})
		},
		setView(state, { payload }) {
			state.view = payload
		},
		setSearch(state, {payload}) {
			state.search = payload
		},
		setFormIsOpen(state, { payload }) {
			state.form.isOpen = payload
		},
		setFormLoading(state, { payload }) {
			state.loadings.form = payload
		},
		setDataLoading(state, { payload }) {
			state.loadings.data = payload
		},
		setApiError(state, { payload }) {
			state.apiError = payload.toString()
		},
		setFormValues(state, { payload }) {
			state.form.values = payload
		},
		setFormIsUpdate(state, { payload }) {
			state.form.isUpdate = payload
		},
		setFormReset(state) {
			state.form = { isUpdate: false, values: null, isOpen: false }
		},
	},
})

export { actions as booksActions, reducer as default }
