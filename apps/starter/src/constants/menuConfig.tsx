import {
	House,
	ListBullets,
	Package,
	Tag,
	User,
	Users,
} from "@phosphor-icons/react/dist/ssr";
import type { Route } from "@ui/types/nav";

export const MenuConfig: Route[] = [
	{
		group: "Main",
		children: [
			{
				title: "Dashboard",
				url: "/",
				icon: <House className="size-4" />,
				permissions: [],
			},
			{
				title: "Products",
				url: "/products",
				icon: <Package className="size-4" />,
				permissions: [],
				children: [
					{
						title: "All Products",
						url: "/products/all",
						icon: <ListBullets className="size-4" />,
						permissions: [],
					},
					{
						title: "Categories",
						url: "/products/categories",
						icon: <Tag className="size-4" />,
						permissions: [],
					},
				],
			},
		],
	},
	{
		group: "Settings",
		children: [
			{
				title: "Profile",
				url: "/settings/profile",
				icon: <User className="size-4" />,
				permissions: [],
			},
			{
				title: "Team",
				url: "/settings/team",
				icon: <Users className="size-4" />,
				permissions: [],
			},
		],
	},
];
