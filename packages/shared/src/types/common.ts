import { AxiosRequestConfig } from "axios";

export type ApiResponse<T = unknown> = {
	result: boolean;
	code: string | null;
	data: T | null;
	message: string | null;
};

export type ListResponse<T = unknown> = {
	content: T;
	totalElements: number | null;
	totalPages: number | null;
};
export type BasicResponse = {
	id: number | null;
	status: number | null;
	modifiedDate: string | null;
	createdDate: string | null;
};

export type TPathParams = Record<string, string | number>;

export type FetcherConfig = Pick<
	AxiosRequestConfig,
	"method" | "url" | "headers"
>;

export type FetcherOptions<TData = unknown, TParams = unknown> = Omit<
	AxiosRequestConfig,
	"method" | "url" | "headers" | "data" | "params"
> & {
	data?: TData;
	params?: TParams;
	pathParams?: TPathParams;
};
