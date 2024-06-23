import { useContext } from 'react';
import { ChatContext } from './chatContext';

export const useChatContext = () => {
	const context = useContext(ChatContext);

	if (typeof context === 'undefined') {
		throw new Error('useChatContext must be used inside ChatContextProvider');
	}

	return context;
};
