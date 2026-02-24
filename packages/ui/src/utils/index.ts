export const wait = (ms: number, fn: () => void) =>
	new Promise<void>((resolve) =>
		setTimeout(() => {
			fn();
			resolve();
		}, ms),
	);
