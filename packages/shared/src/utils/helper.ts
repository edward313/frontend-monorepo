import { storageKeys } from "@repo/shared/constants";
import canUseDom from "@repo/shared/utils/can-use-dom";
import { deleteCookie } from "cookies-next";

export const getBasicAuthFromEnv = () => {
	const username = process.env.NEXT_PUBLIC_USERNAME || "";
	const password = process.env.NEXT_PUBLIC_PASSWORD || "";
	const base64 = btoa(`${username}:${password}`);
	return `Basic ${base64}`;
};
export const logout = () => {
	deleteCookie(storageKeys.accessToken);
};

export const logDevelopmentError = (message: string, detail?: unknown) => {
	if (process.env.NODE_ENV !== "production") {
		console.warn(message, detail);
	}
};

export function redirect(path: string) {
	const currentPath = location.pathname;

	if (currentPath === path) {
		return;
	}

	if (canUseDom()) {
		location.assign(path);
	} else return;
}
