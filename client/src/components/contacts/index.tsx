import { UserChat } from '../user-chat';
import './style.css';
import { useContactsHook } from './useContactsHook';

export const Contacts: React.FC = () => {
	const { chatUsers } = useContactsHook();

	return (
		<div className="bg-white flex-1 rounded-md flex flex-col gap-2 p-3 overflow-y-scroll chat-container">
			<h1 className="text-xl pl-1">chat members</h1>
			{chatUsers.map(({ username, _id }, i) => {
				return (
					<div key={_id}>
						<UserChat username={username} id={_id} />
						{i !== 15 ? <div className="dashed-border"></div> : null}
					</div>
				);
			})}
		</div>
	);
};
