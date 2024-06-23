import { User } from '@/api/login/index.types';
import { LOCAL_STORAGE_KEYS } from '@/enums/storage.enum';
import { TOKEN_KEYS } from '@/enums/tokens.enum';
import { createContext, PropsWithChildren, useState } from 'react';

type UserContextType = {
	username: string | null;
	userID: string | null;
	currentUser: User | undefined;
	token: string | null;
	isUserFetching: boolean;
	setIsUserFetching: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextType>({
	username: null,
	userID: null,
	currentUser: undefined,
	token: null,
	isUserFetching: false,
	setIsUserFetching: () => {},
	setCurrentUser: () => {},
	setToken: () => {},
});

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)
	);
	const username = localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME);
	const userID = localStorage.getItem(LOCAL_STORAGE_KEYS.ID);

	const [isUserFetching, setIsUserFetching] = useState<boolean>(false);
	const [currentUser, setCurrentUser] = useState<User | undefined>();

	return (
		<UserContext.Provider
			value={{
				username,
				currentUser,
				token,
				userID,
				isUserFetching,
				setToken,
				setCurrentUser,
				setIsUserFetching,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
