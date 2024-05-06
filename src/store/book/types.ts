interface IBook {
	book: {
		id: number | string
		isbn: string
		title: string
		cover: string
		author: string
		published: number
		pages: number
	}
	status: number
}

interface IBookReducer {
	data: IBook[]
	view: any
	loadings: {
		data: boolean
		form: boolean
	}
	apiError: string | null
	form: {
		isUpdate: boolean
		isOpen: boolean
		values: any
	}
	search: string
}

export type { IBook, IBookReducer }
