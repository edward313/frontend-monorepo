import { hasLocale, NextIntlClientProvider } from "@repo/i18n";
import type { Metadata } from "next";
import "../globals.css";
import { routing } from "@repo/i18n/routing";
import { notFound } from "next/navigation";
import { LocaleSwitcher } from "../../components/locale-switcher";

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
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body className="antialiased">
				<NextIntlClientProvider>
					<header className="px-6 py-4">
						<LocaleSwitcher />
					</header>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
