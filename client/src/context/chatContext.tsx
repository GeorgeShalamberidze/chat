import { createContext, PropsWithChildren, useContext, useState } from 'react';

type ChatContextType = {
	currentSelectedUserID: string | undefined;
	setCurrentSelectedUserID: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;
};

const ChatContext = createContext<ChatContextType>({
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

export const useChatContext = () => {
	const context = useContext(ChatContext);

	if (typeof context === 'undefined') {
		throw new Error('useChatContext must be used inside ChatContextProvider');
	}

	return context;
};
