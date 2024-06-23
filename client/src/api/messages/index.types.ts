export type MessageBody = {
	message: string;
	from: string | undefined;
	to: string | undefined;
};

export type Message = {
	isFromSelf: boolean;
	message: string;
};

export type MessageResponse = {
	messages: Message[];
};

export type GetMessageBody = {
	from: string | undefined;
	to: string | undefined;
};
