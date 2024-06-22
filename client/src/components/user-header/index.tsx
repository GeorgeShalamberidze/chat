import { useUserContext } from '@/context/useUserContext';
import { Logout } from '../logout';

export const UserHeader: React.FC = () => {
	const { username } = useUserContext();
	return (
		<div className="bg-white w-full rounded-md p-2 h-20 flex items-center px-5 justify-between">
			<div className="font-bold text-xl py-3">{username}</div>
			<Logout />
		</div>
	);
};
