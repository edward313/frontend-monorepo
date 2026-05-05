const PATHS = {
	home: "/",
	login: "/login",
};

export const publicPaths = [];
export const unauthenticatedPaths = [PATHS.login];

// Placeholders so middlewares can import safely.
export const routesRoles = {};
export const teacherRewritePaths = {};

export default PATHS;
