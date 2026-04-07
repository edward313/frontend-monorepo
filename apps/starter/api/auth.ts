import apiConfig from "api/config";
import { fetcher } from "api/instance";
import type { LoginFormType } from "../src/types/auth";

export async function login({ data }: { data?: LoginFormType } = {}) {
	const res = await fetcher(apiConfig.account.token, {
		data,
	});

	return res?.data;
}
