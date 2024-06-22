import { createContext, PropsWithChildren, useState } from 'react';

type ChatContextType = {
	currentSelectedUserID: string | undefined;
	setCurrentSelectedUserID: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;
};

export const ChatContext = createContext<ChatContextType>({
	currentSelectedUserID: undefined,
	setCurrentSelectedUserID: () => undefined,
});

export const ChatProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [currentSelectedUserID, setCurrentSelectedUserID] = useState<
		string | undefined
	>();

	return (
		<ChatContext.Provider
			value={{
				currentSelectedUserID,
				setCurrentSelectedUserID,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
