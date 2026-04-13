import middleware from "@repo/i18n/middleware";

import { createMiddlewareChain } from "@repo/shared";
import type { NextRequest, NextResponse } from "next/server";
import authentication from "./middlewares/authentication";

export default async function proxy(request: NextRequest) {
	const response = await Promise.resolve(middleware(request));
	return createMiddlewareChain<NextRequest, NextResponse>(authentication).run(
		request,
		response,
	);
}

export const config = {
	// Match all pathnames except for
	// - ... if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
	// - ... the ones containing a dot (e.g. `favicon.ico`)
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
