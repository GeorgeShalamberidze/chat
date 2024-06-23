import { ChatProvider } from '@/context/chat/chatContext';
import { SocketProvider } from '@/context/socket/socketContext';
import { UserProvider } from '@/context/user/userContext';
import { Outlet } from 'react-router-dom';

export const RootLayout: React.FC = (): JSX.Element => {
	return (
		<SocketProvider>
			<UserProvider>
				<ChatProvider>
					<Outlet />
				</ChatProvider>
			</UserProvider>
		</SocketProvider>
	);
};
