import { useChatContext } from '@/context/chatContext';

export const UserChat: React.FC<{ username: string; id: string }> = ({
	username,
	id,
}) => {
	const { setCurrentSelectedUserID, currentSelectedUserID } = useChatContext();

	return (
		<div
			className="w-full p-1 cursor-pointer hover:bg-gray-200 rounded-md"
			onClick={() => {
				setCurrentSelectedUserID(id);
				console.group(id, typeof id, typeof currentSelectedUserID);
			}}
		>
			<div className="">
				<p className="text-lg font-bold">{username}</p>
				<p className="text-gray-500 text-sm">last text</p>
			</div>
			<div></div>
		</div>
	);
};
