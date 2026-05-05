import { UserCheckIcon } from "@phosphor-icons/react";
import { House } from "@phosphor-icons/react/dist/ssr";
import type { Route } from "@ui/types/nav";
import PATHS from "@/constants/paths";

export const MenuConfig: Route[] = [
	{
		group: "Main",
		children: [
			{
				title: "Dashboard",
				url: PATHS.admin,
				icon: <UserCheckIcon className="size-4" />,
				permissions: [],
			},
		],
	},
];
