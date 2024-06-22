import api from '..';
import { USER_URLS } from './index.enum';
import { UsersData } from './index.types';

export const getUsers = (
	id?: string | null,
	config?: object
): Promise<UsersData[]> => {
	return api
		.get<UsersData[]>(`${USER_URLS.GET_USERS}/${id}`, config)
		.then((res) => res.data);
};
