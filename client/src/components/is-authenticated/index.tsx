import { useUserContext } from '@/context/userContext';
import { ROOT_PATHS } from '@/enums/route.enum';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const IsAuthenticated: React.FC<PropsWithChildren> = ({
	children,
}): React.ReactNode => {
	const { token: isUserAuthenticated } = useUserContext();

	if (isUserAuthenticated) {
		return <Navigate to={ROOT_PATHS.ROOT} replace />;
	}

	return children;
};

export default IsAuthenticated;
