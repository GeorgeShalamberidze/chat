import { useUserContext } from '@/context/userContext';
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
		<RiShutDownLine
			size={35}
			className="cursor-pointer"
			onClick={handleLogout}
		/>
	);
};
