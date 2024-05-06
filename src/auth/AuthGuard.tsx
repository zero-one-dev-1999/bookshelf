import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthContext } from './useAuthContext'
import { LOGIN_PAGE } from 'helpers/pages'

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated } = useAuthContext()

	if (!isAuthenticated) {
		return <Navigate to={LOGIN_PAGE} />
	}

	return <>{children}</>
}

export default AuthGuard
