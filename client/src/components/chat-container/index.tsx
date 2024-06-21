import { Chat } from '../chat';
import { UserHeader } from '../user-header';

export const ChatContainer: React.FC = () => {
	return (
		<div className="flex-grow gap-2 flex flex-col">
			<UserHeader />
			<Chat />
		</div>
	);
};
