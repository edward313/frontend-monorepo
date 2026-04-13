"use client";

import { usePathname, useRouter } from "@repo/i18n/navigation";
import { routing } from "@repo/i18n/routing";
import { Button } from "@ui/components/button";
import { SidebarTrigger } from "@ui/components/sidebar";
import { setCookie } from "cookies-next";
import { useParams } from "next/navigation";
import UserInformation from "./user-infomation";

const Header = () => {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams<{ locale?: string }>();
	const currentLocale = params?.locale ?? routing.defaultLocale;
	const nextLocale = currentLocale === "vi" ? "en" : "vi";

	const handleToggleLocale = () => {
		setCookie("NEXT_LOCALE", nextLocale);
		router.replace(pathname, { locale: nextLocale });
	};

	return (
		<header className="sticky top-0 flex items-center h-16 bg-primary z-50">
			<SidebarTrigger className="relative left-4 lg:absolute lg:top-0 lg:left-0 lg:-translate-x-2/4 lg:translate-y-2/4" />

			<div className="flex items-center justify-end w-full px-4 lg:px-8 py-3">
				{/* <Search /> */}
				<div className="flex items-center gap-4">
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={handleToggleLocale}
					>
						{nextLocale.toUpperCase()}
					</Button>
					<UserInformation />
				</div>
			</div>
		</header>
	);
};

export default Header;
