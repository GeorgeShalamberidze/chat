import { useChatMessages } from './useChatMessages';

export const ChatMessages: React.FC = () => {
	const { allMessages } = useChatMessages();
	return (
		<div>
			{allMessages.map((msg, i) => (
				<div key={i}>{msg.message}</div>
			))}
		</div>
	);
};
