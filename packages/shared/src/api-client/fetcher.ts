import instance from "@repo/shared/api-client/instance";
import { HTTP_STATUS } from "@repo/shared/constants";
import { FetcherConfig, FetcherOptions } from "@repo/shared/types";
import {
	logDevelopmentError,
	logout,
	redirect,
} from "@repo/shared/utils/helper";
import { generatePath } from "@repo/shared/utils/path";
import type { AxiosError } from "axios";

const FORBIDDEN_PATH = "/forbidden";

export const fetcher = async <
	TResponse = unknown,
	TData = unknown,
	TParams = unknown,
>(
	{ method, url, headers }: FetcherConfig = {},
	{ pathParams, ...rest }: FetcherOptions<TData, TParams> = {},
): Promise<TResponse> => {
	try {
		const response = await instance.request({
			method,
			url: generatePath(url, pathParams),
			headers,
			...rest,
		});

		return response as TResponse;
	} catch (error: unknown) {
		const axiosError = error as AxiosError;
		const status = axiosError.response?.status;

		if (status === HTTP_STATUS.UNAUTHORIZED) {
			logDevelopmentError("fetcher 401 logout", axiosError.config?.url);
			logout();
		} else if (status === HTTP_STATUS.FORBIDDEN) {
			logDevelopmentError(
				"fetcher 403 redirect forbidden",
				axiosError.config?.url,
			);
			redirect(FORBIDDEN_PATH);
		}

		throw error;
	}
};
