import { getPathname } from "@repo/i18n/navigation";
import { routing } from "@repo/i18n/routing";
import { deleteCookie } from "cookies-next";
import { type NextRequest, NextResponse } from "next/server";

import { storageKeys } from "@/constants/app";

type MiddlewareArgs = {
	req: NextRequest;
	res: NextResponse;
};

type RedirectArgs = MiddlewareArgs & {
	url?: string | URL;
	path?: string;
};

type Locale = (typeof routing.locales)[number];

const deleteAllAuthCookies = ({ req, res }: MiddlewareArgs) => {
	deleteCookie(storageKeys.accessToken, { req, res });
	deleteCookie(storageKeys.refreshToken, { req, res });
};

const getSsoUrl = (req: NextRequest) => {
	const pathname = req.nextUrl.pathname;
	const pathLocale = routing.locales.find(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
	);
	const locale =
		pathLocale ?? routing.defaultLocale;
	const loginPath =
		locale !== routing.defaultLocale ? `/${locale}/login` : "/login";
	return new URL(loginPath, req.url);
};

export const mergeHeaders = (res: NextResponse, newRes: NextResponse) => {
	res.headers.forEach((value, key) => {
		if (key.toLowerCase() === "location") return;
		newRes.headers.append(key, value);
	});

	return newRes;
};

export const redirect = ({ req, res, url, path }: RedirectArgs) => {
	const destination = url
		? new URL(url.toString(), req.url)
		: new URL(path ?? "/", req.url);
	const newRes = NextResponse.redirect(destination.toString(), {});

	return mergeHeaders(res, newRes);
};

export const rewrite = ({ req, res, path, url }: RedirectArgs) => {
	const destination = url
		? new URL(url.toString(), req.url)
		: new URL(path ?? "/", req.url);
	const newRes = NextResponse.rewrite(destination, { request: req });

	return mergeHeaders(res, newRes);
};

export const redirectLogin = ({ res, req }: MiddlewareArgs) => {
	deleteAllAuthCookies({ res, req });

	return redirect({ req, res, url: getSsoUrl(req) });
};

export const rewriteForbidden = ({ req }: Pick<MiddlewareArgs, "req">) =>
	NextResponse.rewrite(new URL("/403", req.url), { request: req });
