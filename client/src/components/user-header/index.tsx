import { useUserContext } from '@/context/userContext';

export const UserHeader: React.FC = () => {
	const { username } = useUserContext();
	return (
		<div className="bg-white w-full rounded-md p-2 h-20 flex items-center pl-3">
			<div className="font-bold text-xl py-3">{username}</div>
		</div>
	);
};
