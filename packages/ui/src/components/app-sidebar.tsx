"use client";

import { CaretRightIcon } from "@phosphor-icons/react";
import { Link } from "@repo/i18n/navigation";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@repo/ui/components/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Separator } from "@repo/ui/components/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from "@repo/ui/components/sidebar";
import type { Route, RouteChildren } from "@repo/ui/types/nav";
import type { RequiredPermission } from "@repo/ui/types/permission";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Fragment, useMemo } from "react";

type SidebarLinkProps = {
	item: RouteChildren;
	isActive: boolean;
};

const SidebarLink = ({ item, isActive }: SidebarLinkProps) => {
	const tMenu = useTranslations("Menu");
	return (
		<SidebarMenuButton
			isActive={!!isActive}
			asChild
			className="min-h-10 font-medium"
		>
			<Link href={item.url}>
				{item.icon}
				<span className="text-base">{tMenu(item.title)}</span>
			</Link>
		</SidebarMenuButton>
	);
};

type CollapsibleMenuProps = {
	item: RouteChildren;
	currentPath: string;
};

const CollapsibleMenu = ({ item, currentPath }: CollapsibleMenuProps) => {
	const tMenu = useTranslations("Menu");
	const activeMenu = item.children?.findLast((child) =>
		currentPath.toString().includes(child.url),
	);
	return (
		<Collapsible
			key={item.title}
			asChild
			defaultOpen={true}
			className="group/collapsible"
		>
			<SidebarMenuItem>
				<CollapsibleTrigger
					asChild
					className="min-h-10 group-data-[collapsible=icon]:hidden"
				>
					<SidebarMenuButton
						isActive={!!activeMenu}
						tooltip={tMenu(item.title)}
						className="font-medium"
					>
						{item.icon && item.icon}
						<span className="text-base">{tMenu(item.title)}</span>
						<CaretRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{item.children?.map((subItem) => {
							return (
								<SidebarMenuSubItem key={subItem.title} className="min-h-10">
									<SidebarLink
										item={subItem}
										isActive={!!activeMenu && subItem.url === activeMenu.url}
									/>
								</SidebarMenuSubItem>
							);
						})}
					</SidebarMenuSub>
				</CollapsibleContent>

				<DropdownMenu>
					<DropdownMenuTrigger
						asChild
						className="hidden group-data-[collapsible=icon]:block"
					>
						<SidebarMenuButton tooltip={item.title} className="font-medium">
							{item.icon && item.icon}
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side="right"
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							{item.title}
						</DropdownMenuLabel>
						{item.children?.map((subItem) => (
							<SidebarLink
								key={subItem.title}
								item={subItem}
								isActive={!!activeMenu && subItem.url === activeMenu.url}
							/>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</Collapsible>
	);
};

type AppSidebarProps = {
	routes?: Route[];
	homePath?: string;
	hasAnyPermission?: (required: RequiredPermission[]) => boolean;
	pathname?: string;
	logo?: ReactNode;
	logoAlt?: string;
};

export function AppSidebar({
	routes = [],
	homePath = "/",
	hasAnyPermission = () => true,
	pathname = "",
	logo,
	logoAlt = "Logo",
}: AppSidebarProps) {
	const tGroup = useTranslations("Group");
	const currentPath = pathname;

	const routerByPermissions = useMemo(() => {
		let newRoutes = routes || [];

		newRoutes = newRoutes
			.map((routeGroup) => {
				return {
					...routeGroup,
					children: routeGroup.children
						.filter((route) => hasAnyPermission(route.permissions))
						.map((route) => ({
							...route,
							children: route.children
								? route.children.filter((child) =>
										hasAnyPermission(child.permissions),
									)
								: undefined,
						})),
				};
			})
			.filter((routerGroup) => {
				return !!routerGroup.children.length;
			});

		return newRoutes;
	}, [routes, hasAnyPermission]);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="p-4 pb-0">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="min-h-10 text-foreground hover:bg-transparent group-data-[collapsible=icon]:p-0! hover:text-foreground"
						>
							<Link
								href={homePath}
								className="shrink-0 w-10 h-10 transition-all p-0 -ml-1 group-data-[collapsible=icon]:ml-1"
							>
								{logo ?? (
									<img
										src="/logo.png"
										height={40}
										width={120}
										className="h-10 object-contain"
										alt={logoAlt}
									/>
								)}
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<Separator />
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{routerByPermissions.map((route, index) => (
					<Fragment key={route.group}>
						<SidebarGroup className="px-5">
							<SidebarGroupLabel className="uppercase">
								{tGroup(route.group)}
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{route.children.map((item) => {
										const isActive =
											item.url === homePath
												? currentPath === homePath
												: currentPath.includes(item.url);
										return (
											hasAnyPermission(item.permissions) && (
												<Fragment key={item.title}>
													{item.children ? (
														<CollapsibleMenu
															item={item}
															currentPath={currentPath}
														/>
													) : (
														<SidebarMenuItem>
															<SidebarLink item={item} isActive={isActive} />
														</SidebarMenuItem>
													)}
												</Fragment>
											)
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						{index < routerByPermissions.length - 1 && (
							<Separator className="data-[orientation=horizontal]:w-[calc(100%-2rem)] mx-auto" />
						)}
					</Fragment>
				))}
			</SidebarContent>
		</Sidebar>
	);
}
