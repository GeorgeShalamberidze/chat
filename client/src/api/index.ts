import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	CreateAxiosDefaults,
} from 'axios';

const axiosParams: CreateAxiosDefaults = {
	baseURL: import.meta.env.VERCEL_URL,
};

console.log(import.meta.env.VERCEL_URL);

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
