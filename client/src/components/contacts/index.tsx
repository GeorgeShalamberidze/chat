import { UserChat } from '../user-chat';
import { useContactsHook } from './useContactsHook';
import './style.css';

export const Contacts: React.FC<{ searchInput: string }> = ({
	searchInput,
}) => {
	const { chatUsers, currentSelectedUserID } = useContactsHook();

	return (
		<div className="bg-white flex-1 rounded-md flex flex-col gap-2 p-3 overflow-y-scroll chat-container">
			<h1 className="text-xl pl-1 h-9 mb-[13px]">Chat Members</h1>
			<div className="w-full mb-4 border border-dashed border-gray-400"></div>
			{chatUsers && chatUsers.length > 0
				? chatUsers
						?.filter((users) => users.username.includes(searchInput))
						.map(({ username, _id }, i) => {
							const isUserSelected: boolean = currentSelectedUserID === _id;
							return (
								<div key={_id} className="flex flex-col gap-2">
									<UserChat
										username={username}
										id={_id}
										isUserSelected={isUserSelected}
									/>
									{i !== chatUsers.length - 1 ? (
										<div className="dashed-border"></div>
									) : null}
								</div>
							);
						})
				: 'No users yet'}
		</div>
	);
};
