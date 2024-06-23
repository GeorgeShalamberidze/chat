import { useChatContext } from '@/context/useChatContext';

export const UserChat: React.FC<{
	username: string;
	id: string;
	isUserSelected: boolean;
}> = ({ username, isUserSelected, id }) => {
	const { setCurrentSelectedUser } = useChatContext();

	return (
		<div
			className={`${isUserSelected ? 'bg-slate-800' : 'white hover:bg-gray-200'} w-full p-1 pl-2 cursor-pointer rounded-md`}
			onClick={() => {
				setCurrentSelectedUser({ id, username });
			}}
		>
			<div className="">
				<p
					className={`${isUserSelected ? 'text-white' : 'black'} text-lg font-bold`}
				>
					{username}
				</p>
				<p
					className={`${isUserSelected ? 'text-gray-200' : 'text-gray-500'} text-sm`}
				>
					last text
				</p>
			</div>
			<div></div>
		</div>
	);
};
