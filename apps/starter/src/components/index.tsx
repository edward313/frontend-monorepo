"use client";

import { SidebarTrigger } from "@ui/components/sidebar";
import UserInformation from "./user-infomation";

const Header = () => {
	return (
		<header className="sticky top-0 flex items-center h-16 bg-primary z-50">
			<SidebarTrigger className="relative left-4 lg:absolute lg:top-0 lg:left-0 lg:-translate-x-2/4 lg:translate-y-2/4" />

			<div className="flex items-center justify-end w-full px-4 lg:px-8 py-3">
				{/* <Search /> */}
				<div className="flex items-center gap-4">
					<UserInformation />
				</div>
			</div>
		</header>
	);
};

export default Header;
