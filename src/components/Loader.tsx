import { Box, CircularProgress } from '@mui/material'

const Loader = ({ loading = false }) => {
	if (loading)
		return (
			<Box
				top='78px'
				left='20px'
				display='flex'
				position='fixed'
				alignItems='center'
				justifyContent='center'
				width='calc(100% - 20px)'
				height='calc(100% - 78px)'
				sx={{ zIndex: 100, backdropFilter: 'blur(4px)' }}
			>
				<CircularProgress />
			</Box>
		)
	return
}

export default Loader
