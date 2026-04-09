const paths = {
	home: "/",
	login: "/login",
	homeLocale: "/[locale]",
	loginLocale: "/[locale]/login",
};

export const publicPaths = [];
export const unauthenticatedPaths = [paths.login, paths.loginLocale];

// Placeholders so middlewares can import safely.
export const routesRoles = {};
export const teacherRewritePaths = {};

export default paths;
