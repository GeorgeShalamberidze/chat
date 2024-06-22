import { ChatHeader } from '../chat-header';
import { Contacts } from '../contacts';

export const ContactsContainer: React.FC = () => {
	return (
		<div className="w-2/6 flex flex-col gap-2">
			<ChatHeader />
			<Contacts />
		</div>
	);
};
