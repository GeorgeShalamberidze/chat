import { IoIosSend } from 'react-icons/io';

export const ChatInput: React.FC = () => {
	const handleSendClick = (e: React.MouseEvent) => {
		e.preventDefault();
	};
	return (
		<div className="p-2 rounded-md items-end border-2 border-solid border-gray-300">
			<form className="flex justify-center items-center">
				<input
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
	);
};
