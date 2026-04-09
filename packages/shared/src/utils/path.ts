import queryString from "query-string";

type QueryRecord = Record<string, string | number | boolean | null | undefined>;
type ParamsRecord = Record<string, string | number | null | undefined>;

export const removeTrailingSlash = (val?: string | null) =>
	val?.endsWith("/") ? val?.substring(0, val.length - 1) : val;

export const matchPath = (pattern = "", pathname = ""): boolean => {
	if (pattern === pathname) {
		return true;
	}
	const baseAsPath = removeTrailingSlash(pathname?.split("?")[0]);
	const basePathname = removeTrailingSlash(pattern?.split("?")[0]);
	if (baseAsPath === basePathname) {
		return true;
	}
	const basePathRegex = new RegExp(
		`^${basePathname?.replace(/(\[[a-zA-Z0-9-]+\])+/g, "[a-zA-Z0-9-]+")}$`
			.replace(/\[\[\.\.\.[a-zA-Z0-9-]+\]\]/g, "?.*")
			.replace(/\[\.\.\.[a-zA-Z0-9-]+\]/g, ".*"),
	);
	if (baseAsPath && basePathRegex.test(baseAsPath)) {
		return true;
	}
	return false;
};

export const doesPathInPaths = (currentPath: string, paths: string[]) =>
	paths.some((path) => matchPath(path, currentPath));
