import React, { useState } from 'react'
import { IBook } from 'store/book/types'
import { Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import bookImg from '../../../public/book.png'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useDispatch } from 'react-redux'
import { deleteBookAction, updateBookAction } from 'store/actions'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import useSelector from 'hooks/use-selector'
import { useTranslation } from 'react-i18next'

const Book = ({ book }: { book: IBook }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const { t } = useTranslation()
	const open = Boolean(anchorEl)
	const dispatch = useDispatch()


	const search = useSelector(s => s.Books.search)

	const {
		status,
		book: { author, pages, published, title, id },
	} = book

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleDelete = () => {
		dispatch(deleteBookAction(id))
		handleClose()
	}

	const handleChangeStatus = (st: number) => {
		dispatch(updateBookAction({ ...book, status: st }))
		handleClose()
	}

	return (
		<Card>
			<CardMedia component='img' alt='green iguana' height='140' image={bookImg} />
			<CardContent sx={{ backgroundColor: status === 0 ? '#ffe0b2' : status === 1 ? '#b3e5fc' : '#a5d6a7' }}>
				<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
					<Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
						{title || t('title') + ' -'}
					</Typography>
					{!search ? (
						<IconButton
							size='small'
							sx={{ mr: -2, mt: -1 }}
							id='basic-button'
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							<MoreVertIcon />
						</IconButton>
					) : ''}
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={handleDelete}>
							<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
								<DeleteOutlinedIcon color='error' />
								<Typography sx={{ mt: 0.3 }} variant='subtitle2'>
									{t('delete')}
								</Typography>
							</Stack>
						</MenuItem>
						<MenuItem onClick={() => handleChangeStatus(0)}>
							<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
								<BookmarkRemoveIcon color='warning' />
								<Typography sx={{ mt: 0.3 }} variant='subtitle2'>
									{t('new')}
								</Typography>
							</Stack>
						</MenuItem>
						<MenuItem onClick={() => handleChangeStatus(1)}>
							<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
								<BookmarkIcon color='info' />
								<Typography sx={{ mt: 0.3 }} variant='subtitle2'>
									{t('reading')}
								</Typography>
							</Stack>
						</MenuItem>
						<MenuItem onClick={() => handleChangeStatus(2)}>
							<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
								<BookmarkAddedIcon color='success' />
								<Typography sx={{ mt: 0.3 }} variant='subtitle2'>
								{t('finished')}
								</Typography>
							</Stack>
						</MenuItem>
					</Menu>
				</Stack>
				<Typography variant='body2' color='error'>
					{t('author')} - {author}
				</Typography>
				<Typography variant='caption'>
					{pages} {t('page')}, {published} {t('year-published')}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default Book
