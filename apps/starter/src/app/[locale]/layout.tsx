import { NextIntlClientProvider } from "@repo/i18n";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "../globals.css";

import { Toaster } from "@ui/components/sonner";
import ErrorBoundaryProvider from "@ui/providers/error-boundary-provider";
import TanstackQueryProvider from "@ui/providers/query-provider";
import ThemeProvider from "@ui/providers/theme-provider";

export const metadata: Metadata = {
	title: "Starter",
	description: "Starter app with Next Intl",
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;

	return (
		<html lang={locale} suppressHydrationWarning>
				<body className="antialiased">
					<NextIntlClientProvider>
						<NuqsAdapter>
							<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
								<ErrorBoundaryProvider>
									<TanstackQueryProvider>
										{children}
										<Toaster richColors closeButton position="top-right" />
									</TanstackQueryProvider>
								</ErrorBoundaryProvider>
							</ThemeProvider>
						</NuqsAdapter>
					</NextIntlClientProvider>
				</body>
			</html>
	);
}
