import { uploadFile } from '@/api/upload';
import { useChatContext } from '@/context/chat/useChatContext';
import { useSocketContext } from '@/context/socket/useSocketContext';
import { useUserContext } from '@/context/user/useUserContext';
import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';

export const ChatInput: React.FC = () => {
	const { userID } = useUserContext();
	const { currentSelectedUser: currentSelectedUser } = useChatContext();
	const [message, setMessage] = useState<string>('');
	const [uploadUrl, setUploadUrl] = useState<string | undefined>();
	const { socket } = useSocketContext();

	const handleSendClick = (e: React.MouseEvent) => {
		e.preventDefault();

		if (!message.trim()) return;

		handleSubmit();
		setMessage('');
		setUploadUrl(undefined);
	};

	const handleSubmit = async () => {
		const sendMsgBody = {
			message: message,
			from: userID as string,
			to: currentSelectedUser.id,
			uploadUrl: uploadUrl ? uploadUrl : null,
		};

		await socket.emit('send-msg', sendMsgBody);
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);

		uploadFile(formData).then((res) => {
			const { url } = res.data;
			setMessage(url);
			setUploadUrl(url);
		});
	};

	return (
		<div className="w-full pt-3">
			<div className="rounded-md items-end border-2 border-solid border-gray-300">
				<form className="flex p-2 justify-center items-center relative">
					<input
						value={message}
						onChange={({ target: { value } }) => setMessage(value)}
						type="text"
						className="w-full flex-1 outline-none z-50"
						placeholder="Write message..."
					/>
					<div className="flex gap-2 pl-2">
						<div className="p-2 cursor-pointer rounded-lg bg-slate-800 max-w-[110px] h-full">
							<input
								id="upload-file"
								type="file"
								onChange={handleFileChange}
								className="w-full bg-transparent"
							/>
						</div>
						<div
							className="flex items-center p-2 cursor-pointer rounded-lg bg-slate-800"
							onClick={handleSendClick}
						>
							<button type="submit">
								<IoIosSend size={22} fill="white" />
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
