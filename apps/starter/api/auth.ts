import apiConfig from "@repo/shared/api-client/config";
import { fetcher } from "@repo/shared/api-client/fetcher";
import type { LoginFormType } from "@repo/shared/types";

type LoginResponse = {
	access_token?: string;
	refresh_token?: string;
};

export async function login({ data }: { data?: LoginFormType } = {}) {
	const res = await fetcher<LoginResponse, LoginFormType>(
		apiConfig.account.token,
		{
			data,
		},
	);
	return res;
}
