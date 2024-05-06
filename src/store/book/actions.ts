import { BOOKS_ADD, BOOKS_DELETE, BOOKS_FETCH_DATA, BOOKS_SEARCH, BOOKS_UPDATE } from './action-types'
import { IBook } from './types'

export const booksFetchDataAction = () => ({ type: BOOKS_FETCH_DATA })

export const addBookAction = (payload: string) => ({ type: BOOKS_ADD, payload })

export const deleteBookAction = (payload: string | number) => ({ type: BOOKS_DELETE, payload })

export const updateBookAction = (payload: IBook) => ({ payload, type: BOOKS_UPDATE })

export const searchBooksAction = (payload: string) => ({type: BOOKS_SEARCH, payload})