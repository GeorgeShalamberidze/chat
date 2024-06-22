import { Welcome } from '../welcome';
import { ChatInput } from '../chat-input';
import { useChatContext } from '@/context/useChatContext';

export const Chat: React.FC = () => {
	const { currentSelectedUserID } = useChatContext();

	return (
		<div className="bg-white flex-1 rounded-md p-3">
			{currentSelectedUserID ? (
				<div className="h-full flex flex-col justify-between">
					<p>Chat with ID NUMBER # {currentSelectedUserID}</p>
					<ChatInput />
				</div>
			) : (
				<Welcome />
			)}
		</div>
	);
};
