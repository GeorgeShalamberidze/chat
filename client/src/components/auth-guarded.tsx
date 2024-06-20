import { AUTH_PATHS } from '@/enums/route.enum';
import { LOCAL_STORAGE_KEYS } from '@/enums/storage.enum';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuarded: React.FC<PropsWithChildren> = ({
	children,
}): React.ReactNode => {
	const isUserRegistered = !!localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME);

	if (!isUserRegistered) {
		return <Navigate to={AUTH_PATHS.LOGIN} replace />;
	}

	return children;
};

export default AuthGuarded;
