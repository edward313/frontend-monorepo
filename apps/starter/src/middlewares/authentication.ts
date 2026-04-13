import { getPathname } from "@repo/i18n/navigation";
import { doesPathInPaths } from "@repo/shared/utils/path";
import type { NextRequest, NextResponse } from "next/server";
import { storageKeys } from "@/constants/app";
import PATHS, { publicPaths, unauthenticatedPaths } from "@/constants/paths";
import { routing } from "@repo/i18n/routing";
import { redirect, redirectLogin } from "./utils";

type MiddlewareNext = (
	req: NextRequest,
	res: NextResponse,
) => Promise<NextResponse> | NextResponse;

export default async function authentication(
	req: NextRequest,
	res: NextResponse,
	next: MiddlewareNext,
) {
	const currentPath = req.nextUrl.pathname;
	const isAuthenticated = Boolean(
		req.cookies.get(storageKeys.accessToken)?.value,
	);

	const pathLocale = routing.locales.find(
		(locale) => currentPath === `/${locale}` || currentPath.startsWith(`/${locale}/`),
	);
	const locale = pathLocale ?? routing.defaultLocale;

	const localizedUnauthenticated = unauthenticatedPaths.map((path) =>
		getPathname({ href: path, locale }),
	);
	const localizedPublic = publicPaths.map((path) =>
		getPathname({ href: path, locale }),
	);

	const isUnauthenticatedPath = doesPathInPaths(
		currentPath,
		localizedUnauthenticated,
	);
	const isPublicPath = doesPathInPaths(currentPath, localizedPublic);
	const isPrivatePath = !isPublicPath && !isUnauthenticatedPath;

	let redirectPath: string | undefined;
	if (isAuthenticated && isUnauthenticatedPath) {
		redirectPath = locale !== routing.defaultLocale ? `/${locale}` : PATHS.home;
	} else if (!isAuthenticated && isPrivatePath) {
		return redirectLogin({ res, req });
	}

	if (redirectPath && redirectPath !== currentPath) {
		return redirect({
			res,
			req,
			path: getPathname({ href: redirectPath, locale }),
		});
	}

	return next(req, res);
}
