import { ChatProvider } from '@/context/chatContext';
import { UserProvider } from '@/context/userContext';
import { Outlet } from 'react-router-dom';

export const RootLayout: React.FC = (): JSX.Element => {
	return (
		<UserProvider>
			<ChatProvider>
				<Outlet />
			</ChatProvider>
		</UserProvider>
	);
};
