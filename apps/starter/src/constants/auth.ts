export const getBasicAuthFromEnv = () => {
	const username = process.env.NEXT_PUBLIC_USERNAME || "";
	const password = process.env.NEXT_PUBLIC_PASSWORD || "";
	const base64 = btoa(`${username}:${password}`);
	return `Basic ${base64}`;
};
