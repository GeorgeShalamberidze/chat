import { ChatContainer } from '@/components/chat-container';
import { ContactsContainer } from '@/components/contacts-container';

export const ChatPage: React.FC = () => {
	return (
		<div className="flex h-screen w-screen bg-neutral-200 gap-2 p-2">
			<ContactsContainer />
			<ChatContainer />
		</div>
	);
};
