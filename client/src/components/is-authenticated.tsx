import { ROOT_PATHS } from '@/enums/route.enum';
import { LOCAL_STORAGE_KEYS } from '@/enums/storage.enum';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const IsAuthenticated: React.FC<PropsWithChildren> = ({
	children,
}): React.ReactNode => {
	const isUserRegistered = !!localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME);

	if (isUserRegistered) {
		return <Navigate to={ROOT_PATHS.ROOT} replace />;
	}

	return children;
};

export default IsAuthenticated;
