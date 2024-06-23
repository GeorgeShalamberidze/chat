import { createContext, PropsWithChildren, useState } from 'react';

type ChatContextType = {
	currentSelectedUser: {
		username: string | undefined;
		id: string | undefined;
	};
	setCurrentSelectedUser: React.Dispatch<
		React.SetStateAction<ChatContextType['currentSelectedUser']>
	>;
};

export const ChatContext = createContext<ChatContextType>({
	currentSelectedUser: { username: undefined, id: undefined },
	setCurrentSelectedUser: () => {},
});

export const ChatProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [currentSelectedUser, setCurrentSelectedUser] = useState<
		ChatContextType['currentSelectedUser']
	>({
		id: undefined,
		username: undefined,
	});

	return (
		<ChatContext.Provider
			value={{
				currentSelectedUser,
				setCurrentSelectedUser,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
