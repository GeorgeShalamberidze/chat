export const SOCKET_URL: string | undefined =
	process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3003';
