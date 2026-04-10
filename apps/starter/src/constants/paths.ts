const PATHS = {
	home: "/",
	login: "/login",
	homeLocale: "/[locale]",
	loginLocale: "/[locale]/login",
};

export const publicPaths = [];
export const unauthenticatedPaths = [PATHS.login];

// Placeholders so middlewares can import safely.
export const routesRoles = {};
export const teacherRewritePaths = {};

export default PATHS;
