import { Link } from "@repo/i18n/navigation";
import { getTranslations } from "@repo/i18n/server";
import type { Route, RouteChildren } from "@ui/types/nav";
import type { ReactNode } from "react";

type AppSidebarStaticProps = {
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

export async function AppSidebarStatic({
	routes = [],
	homePath = "/",
	logo,
	logoAlt = "Logo",
}: AppSidebarStaticProps) {
	const tGroup = await getTranslations("Group");
	const tMenu = await getTranslations("Menu");

	return (
		<aside className="hidden md:flex w-72 shrink-0 border-r bg-sidebar text-sidebar-foreground">
			<div className="flex h-full w-full flex-col">
				<div className="p-4">
					<Link
						href={homePath}
						className="flex h-10 w-10 items-center justify-center"
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
				</div>
				<div className="px-5 pb-4">
					{routes.map((group) => (
						<div key={group.group} className="mb-4">
							<p className="text-xs uppercase text-muted-foreground">
								{tGroup(group.group)}
							</p>
							<ul className="mt-2 space-y-2">
								{group.children.map((item) => {
									const hasChildren = !!item.children?.length;
									return (
										<li key={item.title} className="space-y-2">
											{hasChildren ? (
												<details open className="group">
													<summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-2 text-sm font-medium hover:bg-muted">
														<span className="inline-flex items-center gap-2">
															{item.icon}
															<span className="text-base">
																{tMenu(item.title)}
															</span>
														</span>
														<span className="text-xs text-muted-foreground">
															▸
														</span>
													</summary>
													<ul className="mt-2 space-y-2 pl-6">
														{item.children?.map((subItem) => (
															<li key={subItem.title}>
																<SidebarLink
																	item={{
																		...subItem,
																		title: tMenu(subItem.title),
																	}}
																	isSubItem
																/>
															</li>
														))}
													</ul>
												</details>
											) : (
												<SidebarLink
													item={{ ...item, title: tMenu(item.title) }}
												/>
											)}
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
}
