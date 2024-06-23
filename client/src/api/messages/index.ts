import api from '..';
import { MESSAGE_URLS } from './index.enum';
import {
	GetMessageBody,
	MessageBody,
	MessageData,
	MessageResponse,
} from './index.types';
import { AxiosRequestConfig } from 'axios';

export const sendMessage = (body: MessageBody, config?: AxiosRequestConfig) => {
	return api.post<MessageResponse>(`${MESSAGE_URLS.SEND}`, body, config);
};

export const getAllMessage = (body: GetMessageBody): Promise<MessageData> => {
	const { from, to } = body;
	return api
		.get<MessageData>(`${MESSAGE_URLS.GET_ALL}`, { params: { from, to } })
		.then((res) => res.data);
};
