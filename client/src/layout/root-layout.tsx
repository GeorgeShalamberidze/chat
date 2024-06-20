import { AuthProvider } from '@/context/auth';
import { Outlet } from 'react-router-dom';

export const RootLayout: React.FC = (): JSX.Element => {
	return (
		<AuthProvider>
			<Outlet />
		</AuthProvider>
	);
};
