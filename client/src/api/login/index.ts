import api from '..';
import { LoginFormTypes } from '@/pages/auth/login/index.types';
import { LOGIN_URLS } from './index.enum';
import { UserResponse } from './index.types';
import { AxiosRequestConfig } from 'axios';

export const LoginUser = (
	body: LoginFormTypes,
	config?: AxiosRequestConfig
) => {
	return api.post<UserResponse>(`${LOGIN_URLS.LOGIN}`, body, config);
};
