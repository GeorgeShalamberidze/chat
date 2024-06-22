import { useContext } from 'react';
import { UserContext } from './userContext';

export const useUserContext = () => {
	const context = useContext(UserContext);

	if (typeof context === 'undefined') {
		throw new Error('useUserContext must be used inside UserContextProvider');
	}

	return context;
};
