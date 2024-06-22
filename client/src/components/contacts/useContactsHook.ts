import { getUsers } from '@/api/users';
import { UsersData } from '@/api/users/index.types';
import { LOCAL_STORAGE_KEYS } from '@/enums/storage.enum';
import { useEffect, useState } from 'react';

export const useContactsHook = () => {
	const [chatUsers, setChatUsers] = useState<UsersData[]>([]);
	const userID = localStorage.getItem(LOCAL_STORAGE_KEYS.ID); // exclude yourself from list

	useEffect(() => {
		getUsers(userID).then((res: UsersData[]) => {
			setChatUsers(res);
		});
	}, [userID]);

	return {
		chatUsers,
	};
};
