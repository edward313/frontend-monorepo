"use client";

import { storageKeys } from "@repo/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserInformation = () => {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleLogout = () => {
		deleteCookie(storageKeys.accessToken);
		deleteCookie(storageKeys.refreshToken);
		deleteCookie(storageKeys.redirectPath);
		router.replace("/login");
	};

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild className="size-10">
				<Avatar>
					<AvatarImage
						src={"/assets/avatar.jpg"}
						alt="Avatar"
						className="object-cover"
					/>
					<AvatarFallback></AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="start">
				<DropdownMenuLabel className="pb-0">{""}</DropdownMenuLabel>
				<DropdownMenuLabel className="text-xs text-muted-foreground py-0 pb-1">
					{"Không xác định"}
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem variant="destructive" onClick={handleLogout}>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserInformation;
