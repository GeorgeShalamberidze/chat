import AuthGuarded from '@/components/auth-guarded';
import IsAuthenticated from '@/components/is-authenticated';
import { AUTH_PATHS, ROOT_PATHS } from '@/enums/route.enum';
import { RootLayout } from '@/layout/root-layout';
import { NotFound } from '@/pages/404/not-found';
import { LoginPage } from '@/pages/auth/login/login';
import { RegisterPage } from '@/pages/auth/register/register';
import { ChatPage } from '@/pages/chat';
import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from 'react-router-dom';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path={ROOT_PATHS.ROOT}
			element={<RootLayout />}
			errorElement={<NotFound />}
		>
			<Route
				path={AUTH_PATHS.LOGIN}
				element={
					<IsAuthenticated>
						<LoginPage />
					</IsAuthenticated>
				}
			/>
			<Route path={AUTH_PATHS.REGISTER} element={<RegisterPage />} />
			<Route
				path={ROOT_PATHS.ROOT}
				element={
					<AuthGuarded>
						<ChatPage />
					</AuthGuarded>
				}
			/>
		</Route>
	)
);
