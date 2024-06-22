import { useChatContext } from '@/context/chatContext';
import { Welcome } from '../welcome';

export const Chat: React.FC = () => {
	const { currentSelectedUserID } = useChatContext();

	return (
		<div className="bg-white flex-1 rounded-md p-3">
			{currentSelectedUserID ? (
				<p>Chat with ID NUMBER # {currentSelectedUserID}</p>
			) : (
				<Welcome />
			)}
		</div>
	);
};
