import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin",
};

export default function NoAuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
			<div className="hidden bg-secondary lg:flex flex-col items-center justify-center gap-8">
				<div className="flex flex-col items-center gap-4">
					<p className="text-white font-semibold text-3xl"></p>
					{/* <h1 className="text-white font-bold text-5xl">{APP_NAME}</h1> */}
				</div>
			</div>

			<div className="mx-auto flex flex-col items-center justify-center gap-8">
				{children}
			</div>
		</div>
	);
}
