import { Welcome } from '../welcome';
import { ChatInput } from '../chat-input';
import { useChatContext } from '@/context/useChatContext';
import { ChatMessages } from '../chat-messages';
import { SelectedChatUser } from '../selected-chat-user';

export const Chat: React.FC = () => {
	const { currentSelectedUser: currentSelectedUser } = useChatContext();

	return (
		<div className="bg-white flex-1 rounded-md p-3 overflow-y-scroll">
			{currentSelectedUser?.id ? (
				<div className="h-full flex flex-col justify-between">
					<SelectedChatUser username={currentSelectedUser?.username} />
					<ChatMessages />
					<ChatInput />
				</div>
			) : (
				<Welcome />
			)}
		</div>
	);
};
