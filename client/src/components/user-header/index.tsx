import { useUserContext } from '@/context/user/useUserContext';
import { Logout } from '../logout';

export const UserHeader: React.FC = () => {
	const { username } = useUserContext();
	return (
		<div className="bg-white w-full rounded-md p-2 h-20 flex items-center px-5 justify-between">
			<div className="text-xl py-3">
				Welcome, <span className="font-bold text-2xl">{username}</span>
			</div>
			<Logout />
		</div>
	);
};
