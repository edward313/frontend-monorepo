"use client";
import { useTranslations } from "@repo/i18n";
import { Link, usePathname } from "@repo/i18n/navigation";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@ui/components/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
import { Separator } from "@ui/components/separator";
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
} from "@ui/components/sidebar";
import type { Route, RouteChildren } from "@ui/types/nav";
import Image from "next/image";

import { Fragment, type ReactNode } from "react";

type AppSidebarProps = {
	routes?: Route[];
	homePath?: string;
	logo?: ReactNode;
	logoAlt?: string;
};
type SidebarLinkProps = {
	item: RouteChildren;
	isActive: boolean;
};
type CollapsibleMenuProps = {
	item: RouteChildren;
};
const SidebarLink = ({ item, isActive }: SidebarLinkProps) => {
	return (
		<SidebarMenuButton
			isActive={!!isActive}
			asChild
			className="min-h-10 font-medium"
		>
			<Link href={item.url}>
				{item.icon}
				<span className="text-base">{item.title}</span>
			</Link>
		</SidebarMenuButton>
	);
};
const CollapsibleMenu = ({ item }: CollapsibleMenuProps) => {
	const tMenu = useTranslations("Menu");
	const pathname = usePathname();
	const activeMenu = item.children?.findLast((child) =>
		pathname.toString().includes(child.url),
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
export function AppSidebar({
	routes = [],
	homePath = "/",
	logo,
	logoAlt = "Logo",
}: AppSidebarProps) {
	const tGroup = useTranslations();
	const tMenu = useTranslations();

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
								href="/"
								className="shrink-0 w-10 h-10 transition-all p-0 -ml-1 group-data-[collapsible=icon]:ml-1"
							>
								<Image
									src="/logo.png"
									height={40}
									width={120}
									className="h-10 object-contain"
									alt="HT"
								/>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<Separator />
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{routes.map((route, index) => (
					<Fragment key={route.group}>
						<SidebarGroup className="px-5">
							<SidebarGroupLabel className="uppercase">
								{tGroup(route.group)}
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{route.children.map((item) => {
										return (
											<Fragment key={item.title}>
												{item.children ? (
													<CollapsibleMenu item={item} />
												) : (
													<SidebarMenuItem>
														<SidebarLink item={item} isActive={true} />
													</SidebarMenuItem>
												)}
											</Fragment>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						{index < routes.length - 1 && (
							<Separator className="data-[orientation=horizontal]:w-[calc(100%-2rem)] mx-auto" />
						)}
					</Fragment>
				))}
			</SidebarContent>
		</Sidebar>
	);
}
