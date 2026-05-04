import instance from "@repo/shared/api-client/instance";
import { HTTP_STATUS } from "@repo/shared/constants";
import {
	logDevelopmentError,
	logout,
	redirect,
} from "@repo/shared/utils/helper";
import { generatePath } from "@repo/shared/utils/path";

const FORBIDDEN_PATH = "/forbidden";

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
