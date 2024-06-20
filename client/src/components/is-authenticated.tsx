import { ROOT_PATHS } from '@/enums/route.enum';
import { TOKEN_KEYS } from '@/enums/tokens.enum';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const IsAuthenticated: React.FC<PropsWithChildren> = ({
	children,
}): React.ReactNode => {
	const isUserAuthenticated = !!localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);

	if (isUserAuthenticated) {
		return <Navigate to={ROOT_PATHS.ROOT} replace />;
	}

	return children;
};

export default IsAuthenticated;
