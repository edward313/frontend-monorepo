import { RequiredPermission } from "@repo/ui/types/permission";
import type { ReactNode } from "react";

export type RouteChildren = {
	title: string;
	url: string;
	icon?: ReactNode;
	permissions: RequiredPermission[];
	children?: RouteChildren[];
};
export type Route = {
	group: string;
	children: RouteChildren[];
};
