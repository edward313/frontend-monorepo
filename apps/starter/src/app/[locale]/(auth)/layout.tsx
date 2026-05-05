"use client";
import EmptyGallerySvg from "@repo/ui/assets/empty-gallery.svg";
import { AppSidebar } from "@ui/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@ui/components/sidebar";
import Image from "next/image";
import Header from "@/components";
import { MenuConfig } from "@/constants/menuConfig";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar
				routes={MenuConfig}
				logo={
					<span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<Image
							alt="Logo"
							className="size-7"
							height={28}
							src={EmptyGallerySvg}
							width={28}
						/>
					</span>
				}
			/>
			<SidebarInset className="contain-inline-size">
				<Header />
				<main className="px-4 lg:px-8 py-4 flex-1 flex flex-col mx-auto w-full">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
