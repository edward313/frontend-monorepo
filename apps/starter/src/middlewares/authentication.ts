import { doesPathInPaths } from "@repo/shared/utils/path";
import type { NextRequest, NextResponse } from "next/server";
import { storageKeys } from "@/constants/app";
import paths, { publicPaths, unauthenticatedPaths } from "@/constants/paths";
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

	const isUnauthenticatedPath = doesPathInPaths(
		currentPath,
		unauthenticatedPaths,
	);
	const isPublicPath = doesPathInPaths(currentPath, publicPaths);
	const isPrivatePath = !isPublicPath && !isUnauthenticatedPath;

	let redirectPath: string | undefined;
	if (isAuthenticated && isUnauthenticatedPath) {
		redirectPath = paths.home;
	} else if (!isAuthenticated && isPrivatePath) {
		return redirectLogin({ res, req });
	}

	if (redirectPath && redirectPath !== currentPath) {
		return redirect({ res, req, path: redirectPath });
	}

	return next(req, res);
}
