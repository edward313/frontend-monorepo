"use client";

import { useQuery } from "@tanstack/react-query";

type ProductsResponse = {
	products: Array<{
		id: number;
		title: string;
		price: number;
		thumbnail?: string;
	}>;
	total: number;
	skip: number;
	limit: number;
};

async function fetchProducts() {
	const response = await fetch("https://dummyjson.com/products");
	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}
	return (await response.json()) as ProductsResponse;
}

export function QueryTest() {
	const { data, isFetching, isError, error, refetch } = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	return (
		<div className="mt-6 rounded-lg border p-4 text-sm">
			<div className="flex items-center gap-3">
				<p className="font-medium">TanStack Query Test (DummyJSON)</p>
				<button
					type="button"
					className="rounded border px-2 py-1 text-xs"
					onClick={() => refetch()}
				>
					Refetch
				</button>
			</div>

			{isFetching ? <p className="mt-2">Loading...</p> : null}
			{isError ? (
				<p className="mt-2 text-red-600">Error: {String(error)}</p>
			) : null}
			{data ? (
				<pre className="mt-2 overflow-auto rounded bg-neutral-50 p-2">
					{JSON.stringify(data, null, 2)}
				</pre>
			) : null}
		</div>
	);
}
