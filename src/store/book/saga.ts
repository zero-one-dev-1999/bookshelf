import { call, put, takeLeading } from 'redux-saga/effects'
import { BOOKS_ADD, BOOKS_DELETE, BOOKS_FETCH_DATA, BOOKS_SEARCH, BOOKS_UPDATE } from './action-types'
import { booksActions } from './reducer'
import api from 'helpers/api'
import { BOOKS_URL } from 'helpers/urls'

function* booksFetchDataSaga() {
	try {
		yield put(booksActions.setDataLoading(true))

		const { data: response } = yield call(api.get, BOOKS_URL)

		if (response.isOk) {
			yield put(booksActions.setData(response.data ?? []))
		}
	} catch (error) {
		yield put(booksActions.setApiError(error))
	} finally {
		yield put(booksActions.setDataLoading(false))
	}
}

function* addBookSaga({ payload }: any) {
	try {
		yield put(booksActions.setDataLoading(true))

		const { data: response } = yield call(api.post, BOOKS_URL, { isbn: payload })

		if (response.isOk && response.data) {
			yield put(booksActions.addData(response.data))
		}
	} catch (error) {
		yield put(booksActions.setApiError(error))
	} finally {
		yield put(booksActions.setDataLoading(false))
	}
}

function* deleteBookSaga({ payload }: any) {
	try {
		yield put(booksActions.setDataLoading(true))

		const { data: response } = yield call(api.delete, BOOKS_URL + '/' + payload)

		if (response.isOk && response.data) {
			yield put(booksActions.setData(response.data))
		}
	} catch (error) {
		yield put(booksActions.setApiError(error))
	} finally {
		yield put(booksActions.setDataLoading(false))
	}
}

function* updateBookSaga({ payload }: any) {
	try {
		yield put(booksActions.setDataLoading(true))

		const { data: response } = yield call(api.patch, BOOKS_URL + '/' + payload.book.id, payload)

		if (response.isOk && response.data) {
			yield put(booksActions.updateData(response.data))
		}
	} catch (error) {
		yield put(booksActions.setApiError(error))
	} finally {
		yield put(booksActions.setDataLoading(false))
	}
}

function* searchBookSaga({ payload }: any) {
	try {
		yield put(booksActions.setDataLoading(true))

		const { data: response } = yield call(api.get, BOOKS_URL + `${payload ? '/' + payload : ''}`)

		if (response.isOk && response.data) {
			yield put(booksActions.setData(response.data?.map((item: any) => ({ status: 0, book: item }))))
		}
	} catch (error) {
		yield put(booksActions.setApiError(error))
	} finally {
		yield put(booksActions.setDataLoading(false))
	}
}

function* booksSaga() {
	yield takeLeading(BOOKS_FETCH_DATA, booksFetchDataSaga)
	yield takeLeading(BOOKS_ADD, addBookSaga)
	yield takeLeading(BOOKS_DELETE, deleteBookSaga)
	yield takeLeading(BOOKS_UPDATE, updateBookSaga)
	yield takeLeading(BOOKS_SEARCH, searchBookSaga)
}

export default booksSaga
