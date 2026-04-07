"use client";

import { useState } from "react";

type ExplodeButtonProps = {
	onExplode: () => void;
};

function ExplodeButton({ onExplode }: ExplodeButtonProps) {
	return (
		<button
			type="button"
			className="mt-3 rounded border px-3 py-1 text-xs"
			onClick={onExplode}
		>
			Throw Error
		</button>
	);
}

export function ErrorBoundaryDemo() {
	const [shouldThrow, setShouldThrow] = useState(false);

	if (shouldThrow) {
		throw new Error("Demo error from ErrorBoundary");
	}

	return (
		<div className="mt-6 rounded-lg border p-4 text-sm">
			<p className="font-medium">ErrorBoundary Demo</p>
			<p className="mt-1 text-neutral-600">
				Click the button to throw an error and see the fallback UI.
			</p>
			<ExplodeButton onExplode={() => setShouldThrow(true)} />
		</div>
	);
}
