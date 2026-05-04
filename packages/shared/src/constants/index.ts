export enum METHOD {
	GET = "GET",
	POST = "POST",
	DELETE = "DELETE",
	PUT = "PUT",
	PATCH = "PATCH",
}

export enum HEADERS {
	JSON = "application/json",
	MULTIPART = "multipart/form-data",
	FORM_URLENCODED = "application/x-www-form-urlencoded",
}

export enum HTTP_STATUS {
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	CONFLICT = 409,
	UNPROCESSABLE_ENTITY = 422,
	TOO_MANY_REQUESTS = 429,
	INTERNAL_SERVER_ERROR = 500,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
}

export const storageKeys = {
	appLocale: "APP_LOCALE",
	redirectPath: "REDIRECT_PATH",
	accessToken: "accessToken",
	refreshToken: "refreshToken",
};
