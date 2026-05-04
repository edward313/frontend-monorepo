import apiConfig from "@repo/shared/api-client/config";
import { fetcher } from "@repo/shared/api-client/fetcher";
import type { LoginFormType } from "../src/types/auth";

export async function login({ data }: { data?: LoginFormType } = {}) {
	const res = await fetcher(apiConfig.account.token, {
		data,
	});
	return res?.data;
}
