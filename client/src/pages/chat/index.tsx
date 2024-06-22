import { getUsers } from '@/api/user';
import { ChatContainer } from '@/components/chat-container';
import { ContactsContainer } from '@/components/contacts-container';

export const ChatPage: React.FC = () => {
	// getUsers().then((d) => console.log(d));

	return (
		<div className="flex h-screen w-screen bg-neutral-200 gap-2 p-2">
			<ContactsContainer />
			<ChatContainer />
		</div>
	);
};
