import { useForm } from '@tanstack/react-form';
import { RegisterFormTypes } from './index.types';
import { FiUser } from 'react-icons/fi';
import { CiLock } from 'react-icons/ci';
import { LuEye } from 'react-icons/lu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATHS, ROOT_PATHS } from '@/enums/route.enum';
import { registerUser } from '@/api/register';
import { toast } from 'react-toastify';
import { toastConfig } from '@/config/toastConfig';
import { LOCAL_STORAGE_KEYS } from '@/enums/storage.enum';
import { TOKEN_KEYS } from '@/enums/tokens.enum';
import { useUserContext } from '@/context/user/useUserContext';
import 'react-toastify/dist/ReactToastify.css';
import { useSocketContext } from '@/context/socket/useSocketContext';

export const RegisterPage: React.FC = (): JSX.Element => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { setIsUserFetching, setToken } = useUserContext();
	const { socket } = useSocketContext();

	const handleRegister = (formValues: RegisterFormTypes) => {
		setIsUserFetching(true);
		registerUser(formValues)
			.then(async (res) => {
				const { result, username, token, id } = res.data;

				setIsUserFetching(false);

				if (result) {
					await localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, username);
					await localStorage.setItem(LOCAL_STORAGE_KEYS.ID, id);
					await localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
					await socket.emit('add-user', { id });

					setToken(token);
					toast.success(`User ${res.data.username} created !`, toastConfig);
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

	const form = useForm<RegisterFormTypes>({
		defaultValues: {
			username: '',
			password: '',
			confirm_password: '',
		},
		onSubmit: async ({ value }) => await handleRegister(value),
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		void form.handleSubmit();
	};

	return (
		<div className="w-screen h-full flex items-center justify-center flex-col gap-5">
			<h1 className="font-bold text-3xl">Register Form</h1>
			<div className="flex justify-center items-center shadow-md rounded-md p-10 w-1/2 border border-solid border-gray-300">
				<form
					onSubmit={onSubmit}
					name="register"
					className="flex flex-col gap-4 w-full h-[300px]"
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
					<form.Field
						name="confirm_password"
						validators={{
							onChangeListenTo: ['password'],
							onChange: ({ value, fieldApi }) => {
								if (value !== fieldApi.form.getFieldValue('password')) {
									return 'Passwords do not match';
								}
								return undefined;
							},
						}}
						children={(field) => (
							<>
								<div className="flex flex-col relative">
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
										placeholder="Confirm password"
										required
									/>
									<LuEye
										size={23}
										className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
										onClick={() => setShowPassword((val) => !val)}
									/>
									{field.state.meta.errors ? (
										field.state.meta.errors.map((err, i) => (
											<div key={i} className="absolute -bottom-7 text-red-600">
												{err}
											</div>
										))
									) : (
										<div className="h-6 w-full">qwe</div>
									)}
								</div>
							</>
						)}
					/>
					<div>
						<button
							className="w-full bg-black text-white flex justify-center py-3 rounded-md cursor-pointer mt-6"
							type="submit"
						>
							Register
						</button>
					</div>
					<div className="text-gray-600 italic">
						Or if you already have an account, please{' '}
						<span
							className="text-black font-bold cursor-pointer italic"
							onClick={() => navigate(AUTH_PATHS.LOGIN)}
						>
							login
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};
