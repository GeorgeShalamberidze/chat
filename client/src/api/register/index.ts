import { RegisterFormTypes } from '@/pages/auth/register/index.types';
import api from '..';
import { UserResponse } from '../login/index.types';
import { REGISTER_URLS } from './index.enum';
import { AxiosRequestConfig } from 'axios';

export const RegisterUser = (
	body: RegisterFormTypes,
	config?: AxiosRequestConfig
) => {
	return api.post<UserResponse>(`${REGISTER_URLS.REGISTER}`, body, config);
};
