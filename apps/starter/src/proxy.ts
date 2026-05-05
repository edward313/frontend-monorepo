import middleware from "@repo/i18n/middleware";

import { createAuthentication, createMiddlewareChain } from "@repo/shared";
import type { NextRequest, NextResponse } from "next/server";
import PATHS, { publicPaths, unauthenticatedPaths } from "@/constants/paths";

export default async function proxy(request: NextRequest) {
	const response = await Promise.resolve(middleware(request));
	return createMiddlewareChain<NextRequest, NextResponse>(
		createAuthentication(PATHS, publicPaths, unauthenticatedPaths),
	).run(request, response);
}

export const config = {
	// Match all pathnames except for
	// - ... if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
	// - ... the ones containing a dot (e.g. `favicon.ico`)
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
