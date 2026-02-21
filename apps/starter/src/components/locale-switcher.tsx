"use client";

import { useLocale } from "@repo/i18n";
import { Link, usePathname } from "@repo/i18n/navigation";
import { routing } from "@repo/i18n/routing";

export function LocaleSwitcher() {
	const pathname = usePathname();
	const locale = useLocale();

	// Show only the non-vi locale when not in vi; when in vi, show only the other locale.
	const targetLocale = routing.locales.find((loc) => loc !== locale);
	if (!targetLocale) return null;

	return (
		<nav className="text-sm">
			<Link href={pathname} locale={targetLocale} className="underline">
				{targetLocale.toUpperCase()}
			</Link>
		</nav>
	);
}
