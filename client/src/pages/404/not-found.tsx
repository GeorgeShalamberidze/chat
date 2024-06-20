import { ROOT_PATHS } from '@/enums/route.enum';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = (): JSX.Element => {
	const navigate = useNavigate();

	return (
		<div className="h-screen w-screen flex items-center justify-center flex-col gap-5">
			<h1 className="items-center justify-center text-gray-500 text-9xl font-bold">
				404
			</h1>
			<div className="items-center justify-center">
				<h1 className="text-5xl">Sorry, we couldn't find this page</h1>
			</div>
			<div
				onClick={() => navigate(ROOT_PATHS.ROOT)}
				className="cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-md"
			>
				Back to Homepage
			</div>
		</div>
	);
};
