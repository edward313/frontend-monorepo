"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeDemo() {
	const { theme, setTheme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const activeTheme = theme === "system" ? systemTheme : theme;

	return (
		<div className="">
			<p className="font-medium">Theme Provider Demo</p>
			<p className="mt-1 text-neutral-600 dark:text-neutral-300">
				Current theme: <span className="font-semibold">{activeTheme}</span>
			</p>
			<div className="mt-3 flex gap-2">
				<button
					type="button"
					className="rounded border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
					onClick={() => setTheme("light")}
				>
					Light
				</button>
				<button
					type="button"
					className="rounded border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
					onClick={() => setTheme("dark")}
				>
					Dark
				</button>
				<button
					type="button"
					className="rounded border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
					onClick={() => setTheme("system")}
				>
					System
				</button>
			</div>
		</div>
	);
}
