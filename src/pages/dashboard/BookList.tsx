import Book from './Book'

import useSelector from 'hooks/use-selector'
import { Grid, Stack, Typography } from '@mui/material'
import Loader from 'components/Loader'

const Booklist = () => {

	const { books, loading } = useSelector(({ Books: s }) => ({
		books: s.data,
		loading: s.loadings.data,
	}))

	return (
		<Stack>
			<Loader loading={loading} />
			{books?.length > 0 ? (
				<Grid container spacing={2} sx={{ my: 2 }}>
					{books.map(book => (
						<Grid key={book.book.id} item xs={4} lg={2} md={3}>
							<Book book={book} />
						</Grid>
					))}
				</Grid>
			) : (
				<Stack sx={{ py: 8, px: 4 }}>
					<Typography textAlign={'center'} variant='h6'>
						Kitoblar mavjud emas
					</Typography>
				</Stack>
			)}
		</Stack>
	)
}

export default Booklist
