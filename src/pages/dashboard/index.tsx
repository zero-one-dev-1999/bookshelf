import { Button, InputAdornment, OutlinedInput, Stack } from '@mui/material'
import { FC, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addBookAction, booksFetchDataAction, searchBooksAction } from 'store/actions'
import AddIcon from '@mui/icons-material/Add'
import Booklist from './BookList'
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce'
import useSelector from 'hooks/use-selector'
import { booksActions } from 'store/book/reducer'
import { useTranslation } from 'react-i18next'

const Dashboard: FC = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation();

	const search = useSelector(s => s.Books.search)

	const generateISBN = () => {
		const registrantElement = Math.floor(Math.random() * 100000)
			.toString()
			.padStart(5, '0')
		const publicationElement = Math.floor(Math.random() * 10000)
			.toString()
			.padStart(4, '0')

		const checkDigit = Math.floor(Math.random() * 10)

		const isbn = `978${registrantElement}${publicationElement}${checkDigit}`

		return isbn
	}

	const handleAddBook = () => {
		dispatch(addBookAction(generateISBN()))
	}

	const delayFunction = useCallback(
		debounce((text) => {
			if (text) {
				dispatch(searchBooksAction(text))
			} else {
				dispatch(booksFetchDataAction())
			}
		}, 700),
		[]
	)

	useEffect(() => {
		delayFunction(search)
	}, [search])

	return (
		<Stack>
			<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
				<OutlinedInput
					value={search}
					onChange={e => dispatch(booksActions.setSearch(e.target.value))}
					sx={{ width: '40%', borderRadius: '20px', padding: '0 8px' }}
					size='small'
					placeholder={t('search') + '...'}
					endAdornment={
						<InputAdornment position="end">
							<SearchIcon />
						</InputAdornment>
					}
				/>
				<Button variant='contained' color='success' startIcon={<AddIcon />} sx={{ borderRadius: '18px' }} onClick={handleAddBook}>
					{t('add')}
				</Button>
			</Stack>
			<Booklist />
		</Stack>
	)
}

export default Dashboard
