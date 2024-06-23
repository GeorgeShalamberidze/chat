import { getAllMessage } from '@/api/messages';
import { MessageBody } from '@/api/messages/index.types';
import { useChatContext } from '@/context/chat/useChatContext';
import { SOCKET_URL } from '@/context/socket/socketContext';
import { useUserContext } from '@/context/user/useUserContext';
import { getTime } from '@/utils/convertDate';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(SOCKET_URL as string);

export const UserChat: React.FC<{
	username: string;
	id: string;
	isUserSelected: boolean;
}> = ({ username, isUserSelected, id }) => {
	const { setCurrentSelectedUser, currentSelectedUser } = useChatContext();
	const { userID } = useUserContext();
	const [lastMsg, setLastMsg] = useState<string | undefined>();
	const [lastMsgDate, setLastMsgDate] = useState<string | undefined>();
	const [isLastSenderSelf, setIsLastSenderSelf] = useState<boolean>(false);
	// const { socket } = useSocketContext();

	useEffect(() => {
		getAllMessage({ from: userID as string, to: id }).then((res) => {
			const { lastMsg, lastMsgSendDate } = res;
			const lastMessage = Array.isArray(res.messages)
				? res.messages[res.messages.length - 1]?.isFromSelf
				: false;

			if (lastMsg && lastMsgSendDate) {
				setLastMsg(lastMsg);
				setLastMsgDate(getTime(lastMsgSendDate));
				setIsLastSenderSelf(lastMessage);
			}
		});
	}, [id, userID]);

	useEffect(() => {
		socket.on('msg-received', (data: MessageBody) => {
			if (id === data.to || id === data.from) {
				setLastMsg(data.message);
				setLastMsgDate(getTime(data.createdAt));
			}
			if (id === data.to) {
				setIsLastSenderSelf(data.from === userID);
			} else {
				setIsLastSenderSelf(false);
			}
		});

		return () => {
			socket.off('msg-received');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSelectedUser.id]);

	return (
		<div
			className={`${isUserSelected ? 'bg-slate-800' : 'bg-white hover:bg-gray-200'} w-full py-1 px-2 cursor-pointer rounded-md h-14`}
			onClick={() => {
				setCurrentSelectedUser({ id, username });
			}}
		>
			<div className="overflow-x-hidden">
				<div className="flex justify-between items-center">
					<p
						className={`${isUserSelected ? 'text-white' : 'text-black'} text-lg font-bold truncate`}
					>
						{username}
					</p>
					<p
						className={`${isUserSelected ? 'text-gray-200' : 'text-gray-500'} text-sm`}
					>
						{lastMsgDate}
					</p>
				</div>
				<p
					className={`${isUserSelected ? 'text-gray-200' : 'text-gray-500'} text-sm truncate max-w-52`}
				>
					{isLastSenderSelf ? `You: ${lastMsg}` : lastMsg}
				</p>
			</div>
			<div></div>
		</div>
	);
};
