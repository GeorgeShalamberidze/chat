import { getAllMessage } from '@/api/messages';
import { Message } from '@/api/messages/index.types';
import { SOCKET_URL } from '@/constants/socket';
import { useChatContext } from '@/context/useChatContext';
import { useUserContext } from '@/context/useUserContext';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(SOCKET_URL as string);

export const useChatMessages = () => {
	const { currentSelectedUser: currentSelectedUser } = useChatContext();

	const { userID } = useUserContext();
	const [allMessages, setAllMessages] = useState<Message[]>([]);
	const bottomChatContainerRef = useRef<HTMLDivElement | null>(null);

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
