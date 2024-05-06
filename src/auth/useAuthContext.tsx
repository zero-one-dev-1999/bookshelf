import { useSelector } from 'react-redux'

const useAuthContext = () =>
	useSelector(({ Auth: s }: any) => ({
		user: s.user,
		isAuthenticated: s.isAuth,
	}))

export { useAuthContext }
