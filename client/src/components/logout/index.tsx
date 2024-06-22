import { useUserContext } from '@/context/useUserContext';
import { AUTH_PATHS } from '@/enums/route.enum';
import { RiShutDownLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export const Logout: React.FC = () => {
	const navigate = useNavigate();
	const { setToken } = useUserContext();

	const handleLogout = async () => {
		try {
			await localStorage.clear();
			setToken('');
			navigate(AUTH_PATHS.LOGIN, { replace: true });
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	return (
		<div
			className="p-1 rounded-lg bg-slate-800 cursor-pointer hover:opacity-85"
			onClick={handleLogout}
		>
			<RiShutDownLine fill="white" size={30} />
		</div>
	);
};
