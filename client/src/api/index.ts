import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	CreateAxiosDefaults,
} from 'axios';

const axiosParams: CreateAxiosDefaults = {
	baseURL: import.meta.env.VITE_BASE_LOCAL_URL,
};

export const http = axios.create(axiosParams);

const api = (httpClient: AxiosInstance) => {
	return {
		get: <T>(url: string, config?: AxiosRequestConfig) =>
			httpClient.get<T>(url, config),
		post: <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
			httpClient.post<T>(url, body, config),
	};
};

export default api(http);
