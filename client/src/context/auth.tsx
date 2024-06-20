import { createContext, PropsWithChildren } from 'react';

type AuthContextType = {
	user?: string;
};

const AuthContext = createContext<AuthContextType>({
	user: undefined,
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	// TODO
	const authData = { user: 'George' };
	return (
		<AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
	);
};
