"use client";

import { storageKeys } from "@repo/shared/constants";
import axios, {
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "cookies-next/client";

const prefixURL = "";

const serializeParams = (params: Record<string, unknown>) => {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value === null || value === undefined || value === "") {
			continue;
		}

		if (Array.isArray(value)) {
			searchParams.set(key, value.join(","));
			continue;
		}

		searchParams.set(key, String(value));
	}

	return searchParams.toString();
};

const instanceConfig = {
	baseURL: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API}/${prefixURL}`,
	paramsSerializer: serializeParams,
};
const instance = axios.create(instanceConfig);

instance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		if (config.headers.Authorization) {
			return config;
		}

		const access_token = getCookie(storageKeys.accessToken);
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

		return response.data;
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
