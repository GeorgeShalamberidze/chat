import { getAllMessage } from '@/api/messages';
import { Message } from '@/api/messages/index.types';
import { useChatContext } from '@/context/chat/useChatContext';
import { useSocketContext } from '@/context/socket/useSocketContext';
import { useUserContext } from '@/context/user/useUserContext';
import { useEffect, useRef, useState } from 'react';

export const useChatMessages = () => {
	const { currentSelectedUser: currentSelectedUser } = useChatContext();

	const { userID } = useUserContext();
	const [allMessages, setAllMessages] = useState<Message[]>([]);
	const bottomChatContainerRef = useRef<HTMLDivElement | null>(null);

	const { socket } = useSocketContext();

	const scrollToBottom = () => {
		bottomChatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [allMessages]);

	useEffect(() => {
		getAllMessage({ from: userID as string, to: currentSelectedUser?.id }).then(
			(res) => setAllMessages(res.messages)
		);
		socket.on('msg-received', (data) => {
			const newMsg: Message = {
				createdAt: new Date().toDateString(),
				isFromSelf: userID === data.from,
				message: data.message,
			};
			setAllMessages((prev) => (prev ? [...prev, newMsg] : [newMsg]));
		});

		return () => {
			socket.off('msg-received');
		};
	}, [currentSelectedUser?.id, userID]);

	return {
		allMessages,
		bottomChatContainerRef,
	};
};
