import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Paper, useTheme } from '@mui/material'
import MainHeader from './header'

const MainLayout: FC = () => {
	const theme = useTheme()

	return (
		<>
			<MainHeader />
			<Box component='main' mt={`${theme.mixins.toolbar.minHeight}px`}>
				<Paper
					elevation={0}
					sx={{
						background: theme.palette.common.white,
						px: 3,
						py: 3,
					}}
				>
					<Outlet />
				</Paper>
			</Box>
		</>
	)
}

export default MainLayout
