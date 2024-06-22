import { User } from '@/api/login/index.types';
import { LOCAL_STORAGE_KEYS } from '@/enums/storage.enum';
import { TOKEN_KEYS } from '@/enums/tokens.enum';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type UserContextType = {
	username: string | null;
	currentUser: User | undefined;
	token: string | null;
	isUserFetching: boolean;
	setIsUserFetching: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = createContext<UserContextType>({
	username: null,
	currentUser: undefined,
	token: null,
	isUserFetching: false,
	setIsUserFetching: () => {},
	setCurrentUser: () => {},
});

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const token = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
	const username = localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME);

	const [isUserFetching, setIsUserFetching] = useState<boolean>(false);
	const [currentUser, setCurrentUser] = useState<User | undefined>();

	return (
		<UserContext.Provider
			value={{
				username,
				currentUser,
				token,
				isUserFetching,
				setCurrentUser,
				setIsUserFetching,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);

	if (typeof context === 'undefined') {
		throw new Error('useUserContext must be used inside UserContextProvider');
	}

	return context;
};
