import { AUTH_PATHS } from '@/enums/route.enum';
import { TOKEN_KEYS } from '@/enums/tokens.enum';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuarded: React.FC<PropsWithChildren> = ({
	children,
}): React.ReactNode => {
	const isUserRegistered = !!localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);

	if (!isUserRegistered) {
		return <Navigate to={AUTH_PATHS.LOGIN} replace />;
	}

	return children;
};

export default AuthGuarded;
