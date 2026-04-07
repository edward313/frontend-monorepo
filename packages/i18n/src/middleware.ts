import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";

const middleware = createMiddleware({
	...routing,
	localeDetection: false,
});

export default middleware;
