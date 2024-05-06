import { Navigate } from 'react-router-dom'
import * as pages from 'helpers/pages'
import AuthGuard from 'auth/AuthGuard'
import MainLayout from 'layouts/main'
import Dashboard from 'pages/dashboard'

const MainRoutes = {
	path: '/',
	children: [
		{
			path: '/',
			element: (
				<AuthGuard>
					<MainLayout />
				</AuthGuard>
			),
			children: [
				{
					path: '*',
					element: <Navigate to={pages.DASHBOARD_PAGE} />,
				},
				{
					path: '/',
					element: <Navigate to={pages.DASHBOARD_PAGE} />,
				},
				{
					element: <Dashboard />,
					path: pages.DASHBOARD_PAGE,
				},
			],
		},
	],
}

export default MainRoutes
