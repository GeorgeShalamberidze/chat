import { UserChat } from '../user-chat';
import './style.css';

export const Contacts: React.FC = () => {
	return (
		<div className="bg-white flex-1 rounded-md flex flex-col gap-2 p-3 overflow-y-scroll chat-container">
			<h1 className="text-xl pl-1">chat members</h1>
			{[...Array(16)].map((_, i) => {
				return (
					<>
						<UserChat key={i} />
						{i !== 15 ? <div className="dashed-border"></div> : null}
					</>
				);
			})}
		</div>
	);
};
