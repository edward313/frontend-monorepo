import { HEADERS, METHOD } from "@repo/shared/constants";
import { getBasicAuthFromEnv } from "@repo/shared/utils/helper";

const apiConfig = {
	account: {
		token: {
			url: "/token",
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
	},
};

export default apiConfig;
