import {
	type Account,
	type ApiResponse,
	fetcher,
	type ListResponse,
} from "@repo/shared";
import apiConfig from "@repo/shared/api-client/config";

type AccountListParams = {
	page?: number;
	limit?: number;
	search?: string;
};

export const accountApi = {
	getList: ({ data }: { data?: AccountListParams } = {}) =>
		fetcher<ApiResponse<ListResponse<Account[]>>, never, AccountListParams>(
			apiConfig.account.list,
			{
				params: data,
			},
		),
};
