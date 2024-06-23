import { useUserContext } from '@/context/user/useUserContext';
import { AUTH_PATHS } from '@/enums/route.enum';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuarded: React.FC<PropsWithChildren> = ({
	children,
}): React.ReactNode => {
	const { token, isUserFetching } = useUserContext();

	if (!token && !isUserFetching) {
		return <Navigate to={AUTH_PATHS.LOGIN} replace />;
	}

	return children;
};

export default AuthGuarded;
