import { Navigate } from 'react-router'
import GuestGuard from 'auth/GuestGuard'
import LoginLayout from 'layouts/login'
import * as pages from 'helpers/pages'
import Login from 'pages/auth/login'
import Registration from 'pages/auth/registration'

const LoginRoutes = {
	path: '/',
	children: [
		{
			path: '/',
			element: (
				<GuestGuard>
					<LoginLayout />
				</GuestGuard>
			),
			children: [
				{
					path: '*',
					element: <Navigate replace to={pages.LOGIN_PAGE} />,
				},
				{
					path: '/',
					element: <Navigate replace to={pages.LOGIN_PAGE} />,
				},
				{
					element: <Login />,
					path: pages.LOGIN_PAGE,
				},
				{
					element: <Registration />,
					path: pages.REGISTER_PAGE,
				},
			],
		},
	],
}

export default LoginRoutes
