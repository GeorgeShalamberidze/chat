import api from '..';
import { MESSAGE_URLS } from './index.enum';
import { GetMessageBody, MessageData } from './index.types';

export const getAllMessage = (body: GetMessageBody): Promise<MessageData> => {
	const { from, to } = body;
	return api
		.get<MessageData>(`${MESSAGE_URLS.GET_ALL}`, { params: { from, to } })
		.then((res) => res.data);
};
