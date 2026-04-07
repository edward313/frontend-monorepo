"use client";
import axios, {
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";
import { deleteCookie, getCookie } from "cookies-next/client";
import queryString from "query-string";

const prefixURL = "api";

const instanceConfig = {
	baseURL: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API}/${prefixURL}`,
	paramsSerializer: (params: Record<string, any>) =>
		queryString.stringify(params, {
			arrayFormat: "comma",
			skipEmptyString: true,
			skipNull: true,
		}),
};
const instance = axios.create(instanceConfig);
const FORBIDDEN_PATH = "/forbidden";

const generatePath = (
	url = "",
	pathParams?: Record<string, string | number>,
) => {
	if (!pathParams) return url;
	return Object.entries(pathParams).reduce(
		(acc, [key, value]) => acc.replace(`:${key}`, String(value)),
		url,
	);
};

const logDevelopmentError = (message: string, detail?: unknown) => {
	if (process.env.NODE_ENV !== "production") {
		console.warn(message, detail);
	}
};

const logout = () => {
	deleteCookie("access_token");
};

const redirect = (path: string) => {
	if (typeof window !== "undefined") {
		window.location.assign(path);
	}
};

instance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		if (config.headers.Authorization) {
			return config;
		}

		const access_token = getCookie("access_token");
		if (access_token) {
			config.headers.Authorization = `Bearer ${access_token}`;
		}
		return config;
	},
	async (error) => {
		await Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response: AxiosResponse): any => {
		console.log(
			`%c${response.config.method?.toUpperCase()}: ${response.config.url}`,
			"color: green; font-weight: 600",
			{
				status: response.status,
				statusText: response.statusText,
				header: response.headers,
				data: response.data,
			},
		);

		return {
			data: {
				status: response.status,
				...response.data,
			},
		};
	},
	async (error) => {
		console.log(
			`%c${error.response.config.method?.toUpperCase()}: ${
				error.response.config.url
			} - ${error.response.status}`,
			"color: red; font-weight: 600",
			{
				header: error.response.config.headers,
				data: error.response.config.data,
				message: error.message || error.response.statusText,
			},
		);
		return Promise.reject(error);
	},
);

export default instance;

export const fetcher = async (
	{
		method,
		url,
		headers,
	}: { method?: string; url?: string; headers?: any } = {},
	{
		data,
		params,
		pathParams,
		signal,
		...rest
	}: {
		data?: any;
		params?: any;
		pathParams?: Record<string, string | number>;
		signal?: AbortSignal;
		[key: string]: any;
	} = {},
) => {
	try {
		return await instance.request({
			method,
			url: generatePath(url, pathParams),
			headers,
			data,
			params,
			signal,
			...rest,
		});
	} catch (error: any) {
		if (error?.response?.status === 401) {
			logDevelopmentError("fetcher 401 logout", error.config?.url);
			logout();
		} else if (error?.response?.status === 403) {
			logDevelopmentError("fetcher 403 redirect forbidden", error.config?.url);
			redirect(FORBIDDEN_PATH);
		}

		throw error;
	}
};
