import { useContext } from 'react';
import { SocketContext, SocketContextType } from './socketContext';

export const useSocketContext = () => {
	const context = useContext(SocketContext);

	if (typeof context === 'undefined') {
		throw new Error(
			'useSocketContext must be used inside SocketContextProvider'
		);
	}

	return context as SocketContextType;
};
