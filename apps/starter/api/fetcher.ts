import { HTTP_STATUS, storageKeys } from "@repo/shared";
import { generatePath } from "@repo/shared/utils/path";
import { deleteCookie, getCookie } from "cookies-next/client";
import instance from "./instance";

const FORBIDDEN_PATH = "/forbidden";
const logDevelopmentError = (message: string, detail?: unknown) => {
	if (process.env.NODE_ENV !== "production") {
		console.warn(message, detail);
	}
};

const logout = () => {
	deleteCookie(storageKeys.accessToken);
};

const redirect = (path: string) => {
	if (typeof window !== "undefined") {
		window.location.assign(path);
	}
};
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
		if (error?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
			logDevelopmentError("fetcher 401 logout", error.config?.url);
			logout();
		} else if (error?.response?.status === HTTP_STATUS.FORBIDDEN) {
			logDevelopmentError("fetcher 403 redirect forbidden", error.config?.url);
			redirect(FORBIDDEN_PATH);
		}

		throw error;
	}
};
