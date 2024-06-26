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
			const { from, message, uploadUrl } = data;
			const newMsg: Message = {
				createdAt: new Date().toDateString(),
				isFromSelf: userID === from,
				message: message,
				uploadUrl: uploadUrl ? uploadUrl : undefined,
			};
			setAllMessages((prev) => (prev ? [...prev, newMsg] : [newMsg]));
		});

		return () => {
			socket.off('msg-received');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSelectedUser?.id, userID]);

	return {
		allMessages,
		bottomChatContainerRef,
	};
};
