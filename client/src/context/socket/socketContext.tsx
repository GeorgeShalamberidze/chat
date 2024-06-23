import { createContext, PropsWithChildren } from 'react';
import { io, Socket } from 'socket.io-client';

export type SocketContextType = {
	socket: Socket;
};

export const SOCKET_URL: string | undefined =
	process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3003';

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
