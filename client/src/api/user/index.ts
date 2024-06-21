import api from '..';
import { USER_URLS } from './index.enum';
import { UsersData, UsersDataResponse } from './index.types';

export const getUsers = (config?: object): Promise<UsersData> => {
	return api
		.get<UsersDataResponse>(`${USER_URLS.GET_USERS}`, config)
		.then((res) => res.data.data);
};
