"use client";

import FallbackRender from "@repo/ui/components/error-boundary/fallback";
import type React from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function ErrorBoundaryProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ErrorBoundary
			fallbackRender={({ error, resetErrorBoundary }) => (
				<FallbackRender error={error} resetErrorBoundary={resetErrorBoundary} />
			)}
		>
			{children}
		</ErrorBoundary>
	);
}
