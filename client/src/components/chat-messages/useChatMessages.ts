import { getAllMessage } from '@/api/messages';
import { Message } from '@/api/messages/index.types';
import { useChatContext } from '@/context/useChatContext';
import { useUserContext } from '@/context/useUserContext';
import { useEffect, useState } from 'react';

export const useChatMessages = () => {
	const { userID } = useUserContext();
	const { currentSelectedUser: currentSelectedUser } = useChatContext();
	const [allMessages, setAllMessages] = useState<Message[]>([]);

	useEffect(() => {
		getAllMessage({ from: userID as string, to: currentSelectedUser?.id }).then(
			(res) => setAllMessages(res)
		);
	}, [currentSelectedUser, userID]);

	return {
		allMessages,
	};
};
