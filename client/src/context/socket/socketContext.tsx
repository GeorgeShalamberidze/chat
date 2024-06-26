import { createContext, PropsWithChildren } from 'react';
import { io, Socket } from 'socket.io-client';

export type SocketContextType = {
	socket: Socket;
};

const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// eslint-disable-next-line react-refresh/only-export-components
export const SOCKET_URL: string | undefined =
	process.env.NODE_ENV === 'production' ? undefined : VITE_SOCKET_URL || 3003;

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
