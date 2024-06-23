export type MessageBody = {
	message: string;
	from: string | undefined;
	to: string | undefined;
};

export type Message = {
	isFromSelf: boolean;
	message: string;
	createdAt: string;
};

export type MessageData = {
	messages: Message[];
	lastMsg: string;
	lastMsgSendDate: string | undefined;
};

export type MessageResponse = {
	data: MessageData;
};

export type GetMessageBody = {
	from: string | undefined;
	to: string | undefined;
};
