import api from '..';
import { LOGIN_URLS } from './index.enum';
import { User, UserResponse } from './index.types';
import { AxiosRequestConfig } from 'axios';

export const LoginUser = (config?: AxiosRequestConfig): Promise<User> => {
	return api
		.get<UserResponse>(`${LOGIN_URLS.LOGIN}`, config)
		.then((res) => res.data.data);
};
