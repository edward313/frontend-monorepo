import { Route } from "@ui/types/nav";

export const MenuConfig: Route[] = [
  {
    group: "Main",
    children: [
      {
        title: "Dashboard",
        url: "/",
        permissions: [],
      },
      {
        title: "Products",
        url: "/products",
        permissions: [],
        children: [
          {
            title: "All Products",
            url: "/products/all",
            permissions: [],
          },
          {
            title: "Categories",
            url: "/products/categories",
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
        permissions: [],
      },
      {
        title: "Team",
        url: "/settings/team",
        permissions: [],
      },
    ],
  },
];
