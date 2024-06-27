import { createContext, PropsWithChildren } from 'react';
import { io, Socket } from 'socket.io-client';

export type SocketContextType = {
	socket: Socket;
};

// eslint-disable-next-line react-refresh/only-export-components
export const SOCKET_URL: string | undefined =
	process.env.NODE_ENV === 'production'
		? undefined
		: 'https://chat-back-sigma.vercel.app/';

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const socket = io(SOCKET_URL as string, {
		reconnectionAttempts: 3,
		reconnectionDelay: 3000,
	});

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};
