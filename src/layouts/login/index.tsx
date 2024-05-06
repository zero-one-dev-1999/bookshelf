import { Box, Stack, Container, Grid, Tabs, Tab } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import books from '../../../public/book.png'
import { LOGIN_PAGE, REGISTER_PAGE } from 'helpers/pages'

const LoginLayout: FC = () => {
	const [activeTab, setActiveTab] = useState(1)
	const navigate = useNavigate()

	useEffect(() => {
		if (activeTab === 1) {
			navigate(LOGIN_PAGE)
		} else {
			navigate(REGISTER_PAGE)
		}
	}, [activeTab])

	return (
		<Container maxWidth='md' >
			<Stack sx={{ height: '92vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Grid container spacing={5}>
					<Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
						<Box alt='Logo' component='img' src={books} sx={{ width: '75%' }} />
					</Grid>
					<Grid item xs={6}>
						<Stack sx={{ mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<Tabs
								value={activeTab}
								onChange={(_, tab) => {
									setActiveTab(tab)
								}}
							>
								<Tab value={1} label={'Kirish'} />
								<Tab value={2} label={`Ro'yhatdan o'tish`} />
							</Tabs>
						</Stack>

						<Outlet />
					</Grid>
				</Grid>
			</Stack>
		</Container>
	)
}

export default LoginLayout
