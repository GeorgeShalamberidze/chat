import { UserProvider } from '@/context/user';
import { Outlet } from 'react-router-dom';

export const RootLayout: React.FC = (): JSX.Element => {
	return (
		<UserProvider>
			<Outlet />
		</UserProvider>
	);
};
