import {  AppBar, Toolbar, useTheme } from '@mui/material'
import { FC } from 'react'
import Profile from './Profile'
import Language from './Language'

const MainHeader: FC = () => {
	const theme = useTheme()


	return (
		<AppBar
			elevation={0}
			position='fixed'
			color='transparent'
			sx={{
				borderRadius: 0,
				backdropFilter: 'blur(4px)',
				zIndex: theme.zIndex.appBar + 1,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-end',
			}}
		>
			<Toolbar>
				<Language />
				<Profile />
			</Toolbar>
		</AppBar>
	)
}

export default MainHeader
