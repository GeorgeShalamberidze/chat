import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	CreateAxiosDefaults,
} from 'axios';

const axiosParams: CreateAxiosDefaults = {
	baseURL: import.meta.env.VITE_VERCEL_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		common: { 'Content-Type': 'application/json' },
	},
};

export const http = axios.create(axiosParams);

export const setAuthorizationHeader = (tokenType: string, token: string) => {
	http.defaults.headers.Authorization = `${tokenType} ${token}`;
};

const api = (httpClient: AxiosInstance) => {
	return {
		get: <T>(url: string, config?: AxiosRequestConfig) =>
			httpClient.get<T>(url, config),
		post: <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
			httpClient.post<T>(url, body, config),
	};
};

export default api(http);
