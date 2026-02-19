export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			1<body>{children}</body>
		</html>
	);
}
