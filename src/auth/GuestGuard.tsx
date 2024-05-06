import { FC, PropsWithChildren } from 'react'
import { DASHBOARD_PAGE } from 'helpers/pages'
import { Navigate } from 'react-router-dom'

import { useAuthContext } from './useAuthContext'

const GuestGuard: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated } = useAuthContext()

	if (isAuthenticated) {
		return <Navigate to={DASHBOARD_PAGE} />
	}

	return <>{children}</>
}

export default GuestGuard
