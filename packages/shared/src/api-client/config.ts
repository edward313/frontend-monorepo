import { HEADERS, METHOD } from "@repo/shared/constants";
import { getBasicAuthFromEnv } from "@repo/shared/utils/helper";

const apiConfig = {
	account: {
		token: {
			url: "api/token",
			method: METHOD.POST,
			headers: {
				"Content-Type": HEADERS.JSON,
				Authorization: getBasicAuthFromEnv(),
			},
		},
		login: {
			url: "/auth/login",
			method: METHOD.POST,
			headers: { "Content-Type": HEADERS.JSON },
		},
		refreshToken: {
			url: "/auth/refresh-token",
			method: METHOD.POST,
			headers: { "Content-Type": HEADERS.JSON },
		},
		list: {
			url: "/v1/account/list",
			method: METHOD.GET,
			headers: { "Content-Type": HEADERS.JSON },
		},
	},
};

export default apiConfig;
