"use client";

import {
	QueryClient,
	type QueryClientConfig,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { useState } from "react";

type QueryProviderProps = {
	children: ReactNode;
	config?: QueryClientConfig;
	showDevtools?: boolean;
};

const defaultConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 60_000,
			gcTime: 5 * 60_000,
			retry: 1,
		},
		mutations: {
			retry: 0,
		},
	},
};

const buildConfig = (config?: QueryClientConfig): QueryClientConfig => ({
	...defaultConfig,
	...config,
	defaultOptions: {
		...defaultConfig.defaultOptions,
		...config?.defaultOptions,
		queries: {
			...defaultConfig.defaultOptions?.queries,
			...config?.defaultOptions?.queries,
		},
		mutations: {
			...defaultConfig.defaultOptions?.mutations,
			...config?.defaultOptions?.mutations,
		},
	},
});

export function QueryProvider({
	children,
	config,
	showDevtools,
}: QueryProviderProps) {
	const [client] = useState(() => new QueryClient(buildConfig(config)));
	const enableDevtools = showDevtools ?? process.env.NODE_ENV !== "production";

	return (
		<QueryClientProvider client={client}>
			{children}
			{enableDevtools ? <ReactQueryDevtools initialIsOpen={false} /> : null}
		</QueryClientProvider>
	);
}

export default QueryProvider;
