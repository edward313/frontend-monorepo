import { cn } from "@repo/ui/utils/cn";
import type React from "react";

export type FlexProps = {
	direction?: "row" | "column";
	justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
	items?: "start" | "end" | "center";
	wrap?: "nowrap" | "wrap" | "wrap-reverse";
	gap?: number;
	className?: string;
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const directionClass = {
	row: "flex-row",
	column: "flex-col",
};

const justifyClass = {
	start: "justify-start",
	end: "justify-end",
	center: "justify-center",
	between: "justify-between",
	around: "justify-around",
	evenly: "justify-evenly",
};

const itemsClass = {
	start: "items-start",
	end: "items-end",
	center: "items-center",
};

const wrapClass = {
	nowrap: "flex-nowrap",
	wrap: "flex-wrap",
	"wrap-reverse": "flex-wrap-reverse",
};

const Flex = ({
	children,
	className,
	direction = "row",
	justify = "start",
	items = "start",
	wrap = "nowrap",
	gap = 2,
	...props
}: FlexProps) => {
	const gapClass = `gap-${gap}`;
	return (
		<div
			className={cn(
				"flex",
				directionClass[direction],
				justifyClass[justify],
				itemsClass[items],
				wrapClass[wrap],
				gapClass,
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export default Flex;
