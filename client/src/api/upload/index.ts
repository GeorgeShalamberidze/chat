import { AxiosRequestConfig } from 'axios';
import api from '..';
import { UploadResponse } from './index.types';
import { UPLOAD_URLS } from './index.enum';

export const uploadFile = (body: FormData, config?: AxiosRequestConfig) => {
	return api.post<UploadResponse>(`${UPLOAD_URLS.UPLOAD}`, body, config);
};
