import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useisTablet() {
	const [isTablet, setisTablet] = React.useState<boolean | undefined>(
		undefined,
	);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setisTablet(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setisTablet(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	return !!isTablet;
}

export function useIsTablet() {
	const [isTablet, setIsTablet] = React.useState<boolean | undefined>(
		undefined,
	);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsTablet(window.innerWidth < TABLET_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsTablet(window.innerWidth < TABLET_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	return !!isTablet;
}
