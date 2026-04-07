"use client";

import { AppSidebar } from "@ui/components/app-sidebar";
import type { Route } from "@ui/types/nav";
import Image from "next/image";
import { usePathname } from "next/navigation";

type AppSidebarClientProps = {
	logoSrc?: string;
	logoAlt?: string;
	homePath?: string;
	routes?: Route[];
};

export function AppSidebarClient({
	logoSrc = "/logo.png",
	logoAlt = "Logo",
	homePath = "/",
	routes,
}: AppSidebarClientProps) {
	const pathname = usePathname();

	return (
		<AppSidebar
			pathname={pathname}
			homePath={homePath}
			routes={routes}
			logo={
				<Image
					src={logoSrc}
					alt={logoAlt}
					width={120}
					height={40}
					className="h-10 object-contain"
				/>
			}
		/>
	);
}
