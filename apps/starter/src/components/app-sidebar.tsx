import { Link } from "@repo/i18n/navigation";
import { getTranslations } from "@repo/i18n/server";
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
function SidebarLink({
	item,
	isSubItem = false,
}: {
	item: RouteChildren;
	isSubItem?: boolean;
}) {
	return (
		<Link
			href={item.url}
			prefetch={false}
			className={
				isSubItem
					? "text-sm text-muted-foreground hover:text-foreground"
					: "text-sm font-medium text-foreground hover:text-foreground"
			}
		>
			<span className="inline-flex items-center gap-2">
				{item.icon}
				<span className={isSubItem ? "text-sm" : "text-base"}>
					{item.title}
				</span>
			</span>
		</Link>
	);
}

export async function AppSidebar({
	routes = [],
	homePath = "/",
	logo,
	logoAlt = "Logo",
}: AppSidebarProps) {
	const tGroup = await getTranslations("Group");
	const tMenu = await getTranslations("Menu");

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
				{routes?.map((route, index) => (
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
												<SidebarMenuItem>
													<SidebarLink item={item} />
												</SidebarMenuItem>
											</Fragment>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</Fragment>
				))}
			</SidebarContent>
		</Sidebar>
	);
}
