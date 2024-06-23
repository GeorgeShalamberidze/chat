import { useChatContext } from '@/context/chat/useChatContext';
import { useSocketContext } from '@/context/socket/useSocketContext';
import { useUserContext } from '@/context/user/useUserContext';
import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';

export const ChatInput: React.FC = () => {
	const { userID } = useUserContext();
	const { currentSelectedUser: currentSelectedUser } = useChatContext();
	const [message, setMessage] = useState<string>('');
	const { socket } = useSocketContext();

	const handleSendClick = (e: React.MouseEvent) => {
		e.preventDefault();

		if (message !== '') {
			setMessage('');
			handleSubmit();
		}
	};

	const handleSubmit = async () => {
		const sendMsgBody = {
			message,
			from: userID as string,
			to: currentSelectedUser.id,
		};

		await socket.emit('send-msg', sendMsgBody);
	};

	return (
		<div className="w-full pt-3">
			<div className="p-2 rounded-md items-end border-2 border-solid border-gray-300">
				<form className="flex justify-center items-center">
					<input
						value={message}
						onChange={({ target: { value } }) => setMessage(value)}
						type="text"
						className="w-full flex-1 outline-none"
						placeholder="Write message..."
					/>
					<div
						className="flex items-center p-2 cursor-pointer rounded-lg bg-slate-800"
						onClick={handleSendClick}
					>
						<button type="submit">
							<IoIosSend size={22} fill="white" />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
