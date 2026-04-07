"use client";

import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
export default function FallbackRender({ error, resetErrorBoundary }: any) {
	return (
		<section className="flex h-screen w-screen items-center justify-center px-4">
			<Card className="w-full max-w-3xl">
				<CardHeader>
					<CardTitle className="text-lg text-destructive">
						Error Boundary
					</CardTitle>
					<CardDescription>
						Click the button below to trigger an error and see the error
						boundary in action
					</CardDescription>
				</CardHeader>
				<CardContent className="bg-red-50 text-destructive mx-4 p-6 rounded-md">
					{error.message}
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button
						type="button"
						className="w-full"
						variant="destructive"
						onClick={resetErrorBoundary}
					>
						Retry
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
}
