import middleware from "@repo/i18n/middleware";
import type { NextRequest } from "next/server";
import createMiddlewareChain from "./middlewares";

export default async function proxy(request: NextRequest) {
	const response = await Promise.resolve(middleware(request));

	return createMiddlewareChain(request, response);
}

export const config = {
	// Match all pathnames except for
	// - ... if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
	// - ... the ones containing a dot (e.g. `favicon.ico`)
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
