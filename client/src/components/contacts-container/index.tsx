import { useState } from 'react';
import { ChatHeader } from '../chat-header';
import { Contacts } from '../contacts';

export const ContactsContainer: React.FC = () => {
	const [searchUsersInput, setSearchedUsersInput] = useState<string>('');
	return (
		<div className="w-2/6 flex flex-col gap-2">
			<ChatHeader setSearchedUsersInput={setSearchedUsersInput} />
			<Contacts searchInput={searchUsersInput} />
		</div>
	);
};
