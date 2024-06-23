import { Welcome } from '../welcome';
import { ChatInput } from '../chat-input';
import { useChatContext } from '@/context/useChatContext';
import { ChatMessages } from '../chat-messages';

export const Chat: React.FC = () => {
	const { currentSelectedUser: currentSelectedUser } = useChatContext();

	return (
		<div className="bg-white flex-1 rounded-md p-3">
			{currentSelectedUser?.id ? (
				<div className="h-full flex flex-col justify-between">
					<p>
						Chating with{' '}
						<span className="font-bold text-xl">
							{currentSelectedUser.username}
						</span>
					</p>
					<ChatMessages />
					<ChatInput />
				</div>
			) : (
				<Welcome />
			)}
		</div>
	);
};
