import { getUsers } from '@/api/users';
import { UsersData } from '@/api/users/index.types';
import { useChatContext } from '@/context/chat/useChatContext';
import { useSocketContext } from '@/context/socket/useSocketContext';
import { LOCAL_STORAGE_KEYS } from '@/enums/storage.enum';
import { useEffect, useState } from 'react';

export const useContactsHook = () => {
	const [chatUsers, setChatUsers] = useState<UsersData[]>([]);
	const userID = localStorage.getItem(LOCAL_STORAGE_KEYS.ID);
	const { currentSelectedUser } = useChatContext();
	const { socket } = useSocketContext();

	useEffect(() => {
		// exclude yourself from list
		getUsers(userID).then((res: UsersData[]) => {
			setChatUsers(res);
		});

		socket.on('user-added', (users: UsersData[]) => {
			const chatUsers = users.filter((user) => user._id !== userID);
			setChatUsers(chatUsers);
		});

		return () => {
			socket.off('user-added');
		};
	}, [socket, userID]);

	return {
		chatUsers,
		currentSelectedUserID: currentSelectedUser.id,
	};
};
