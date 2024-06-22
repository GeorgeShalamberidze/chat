import { Search } from '../search';

export const ChatHeader: React.FC<{
	setSearchedUsersInput: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setSearchedUsersInput }) => {
	return (
		<div className="w-full rounded-md bg-white flex px-4 gap-4 py-4 items-center justify-center h-20">
			<div className="text-xl font-bold">Chat</div>
			<Search setInput={setSearchedUsersInput} />
		</div>
	);
};
