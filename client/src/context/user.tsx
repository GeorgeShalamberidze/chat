import { LOCAL_STORAGE_KEYS } from '@/enums/storage.enum';
import { TOKEN_KEYS } from '@/enums/tokens.enum';
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';

type UserContextType = {
	username: string | null;
	token: string | null;
	isUserFetching: boolean;
	setIsUserFetching: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextType>({
	username: null,
	token: null,
	isUserFetching: false,
	setIsUserFetching: () => {},
});

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const username = localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME);
	const token = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
	const [isUserFetching, setIsUserFetching] = useState<boolean>(false);

	const [currentUser, setCurrentUser] = useState<string | null>(null);

	useEffect(() => {
		if (token && username) {
			setCurrentUser(username);
		}
	}, [token, username]);

	return (
		<UserContext.Provider
			value={{
				username: currentUser,
				token,
				isUserFetching,
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
