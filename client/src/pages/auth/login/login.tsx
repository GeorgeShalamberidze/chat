import { useForm } from '@tanstack/react-form';
import { FiUser } from 'react-icons/fi';
import { CiLock } from 'react-icons/ci';
import { LuEye } from 'react-icons/lu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATHS, ROOT_PATHS } from '@/enums/route.enum';
import { toast } from 'react-toastify';
import { toastConfig } from '@/config/toastConfig';
import { LoginFormTypes } from './index.types';
import { LoginUser } from '@/api/login';
import { TOKEN_KEYS } from '@/enums/tokens.enum';
import { LOCAL_STORAGE_KEYS } from '@/enums/storage.enum';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '@/context/useUserContext';

export const LoginPage: React.FC = (): JSX.Element => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { setIsUserFetching, setCurrentUser, setToken } = useUserContext();

	const handleLogin = (formValues: LoginFormTypes) => {
		setIsUserFetching(true);
		LoginUser(formValues)
			.then((res) => {
				setIsUserFetching(false);
				const { result, token, username, id } = res.data;
				if (result) {
					localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, username);
					localStorage.setItem(LOCAL_STORAGE_KEYS.ID, id);
					localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);

					setCurrentUser({ id, username });
					setToken(token);
					navigate(ROOT_PATHS.ROOT);
				}
			})
			.catch((err) => {
				if (err) {
					console.log(err);
					// eslint-disable-next-line no-unsafe-optional-chaining
					const { message } = err?.response?.data;
					toast.error(message, toastConfig);
				}
			});
	};

	const form = useForm<LoginFormTypes>({
		defaultValues: {
			username: '',
			password: '',
		},
		onSubmit: async ({ value }) => await handleLogin(value),
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		void form.handleSubmit();
	};

	return (
		<div className="w-screen h-full flex items-center justify-center flex-col gap-5">
			<h1 className="font-bold text-3xl">Login Form</h1>
			<div className="flex justify-center items-center shadow-md rounded-md p-10 w-1/2 border border-solid border-gray-300">
				<form
					onSubmit={onSubmit}
					name="login"
					className="flex flex-col gap-4 w-full h-[230px]"
				>
					<form.Field
						name="username"
						children={(field) => (
							<div className="flex flex-col relative">
								<FiUser
									size={20}
									className="absolute top-1/2 -translate-y-1/2 left-3"
								/>
								<input
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									className="py-3 pl-10 rounded-md outline-0 border-solid border-[1px] border-[#00000020] placeholder:text-neutral-400"
									type="text"
									placeholder="Type username..."
									required
								/>
							</div>
						)}
					/>
					<form.Field
						name="password"
						children={(field) => (
							<div className="password_input flex flex-col relative">
								<CiLock
									size={20}
									className="absolute top-1/2 -translate-y-1/2 left-3"
								/>
								<input
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									className="py-3 pl-10 rounded-md outline-0 border-solid border-[1px] border-[#00000020] placeholder:text-neutral-400"
									type={showPassword ? 'text' : 'password'}
									placeholder="Type password"
									required
								/>
								<LuEye
									size={23}
									className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
									onClick={() => setShowPassword((val) => !val)}
								/>
							</div>
						)}
					/>

					<div>
						<button
							className="w-full bg-black text-white flex justify-center py-3 rounded-md cursor-pointer mt-6"
							type="submit"
						>
							Login
						</button>
					</div>
					<div className="text-gray-600 italic">
						Or register account from{' '}
						<span
							className="text-black font-bold cursor-pointer italic"
							onClick={() => navigate(AUTH_PATHS.REGISTER)}
						>
							here
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};
