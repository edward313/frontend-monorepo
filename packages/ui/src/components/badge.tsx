import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@repo/ui/utils/cn";
import type { StatusDisplay } from "@repo/ui/types/common";
import { Loader } from "lucide-react";

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-sm border px-2 py-1 text-sm font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				success:
					"border-transparent bg-green-100 text-green-800 font-medium [a&]:hover:bg-green-500/90 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-500/40 dark:bg-green-500/60",
				default:
					"border-transparent bg-primary font-medium text-primary-foreground [a&]:hover:bg-primary/90",
				secondary:
					"border-transparent bg-secondary font-medium text-secondary-foreground [a&]:hover:bg-secondary/90",
				info: "border-transparent bg-blue-100 text-blue-800 font-medium [a&]:hover:bg-blue-500/90 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-500/40 dark:bg-blue-500/60",
				destructive:
					"border-transparent bg-red-200 text-red-800 [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"text-foreground font-medium bg-gray-100 text-gray-900 [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
				warning:
					"border-transparent bg-yellow-100 text-yellow-800 font-medium [a&]:hover:bg-yellow-500/90 focus-visible:ring-yellow-500/20 dark:focus-visible:ring-yellow-500/40 dark:bg-yellow-500/60",
				outline_blue:
					"border border-blue-200 bg-blue-50 text-blue-700 shadow-xs [a&]:hover:bg-blue-700/10",
				orange:
					"border-transparent bg-orange-300 text-orange-900 font-medium [a&]:hover:bg-orange-500/90 focus-visible:ring-orange-500/20 dark:focus-visible:ring-orange-500/40 dark:bg-orange-500/60",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Badge({
	className,
	variant,
	hover = false,
	disabled = false,
	asChild = false,
	value,
	isLoading = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & {
		asChild?: boolean;
		hover?: boolean;
		disabled?: boolean;
		value?: StatusDisplay;
		isLoading?: boolean;
	}) {
	const Comp = asChild ? Slot : "span";

	if (value) {
		props.children = (
			<>
				{!isLoading && value?.icon}
				{value?.label}
			</>
		);

		variant = variant || value?.variant;
	} else {
		props.children =
			props.children !== undefined && props.children !== null
				? props.children
				: props.children || "-";
		variant = variant || "secondary";
	}

	if (isLoading) {
		props.children = (
			<>
				<Loader className="size-4 animate-spin" />
				{props.children}
			</>
		);
	}

	return (
		<Comp
			data-slot="badge"
			className={cn(
				badgeVariants({ variant }),
				{
					"hover:bg-green-500/20": hover && variant === "success",
					"hover:bg-blue-500/20": hover && variant === "info",
					"hover:bg-primary/30": hover && variant === "default",
					"hover:bg-orange-500/20": hover && variant === "orange",
					"hover:bg-secondary/30": hover && variant === "secondary",
					"hover:bg-destructive/30": hover && variant === "destructive",
					"hover:bg-accent": hover && variant === "outline",
					"hover:bg-yellow-500/20": hover && variant === "warning",
					"hover:bg-blue-700/10": hover && variant === "outline_blue",
				},
				{
					"cursor-pointer transition-all": hover,
					"pointer-events-none": disabled,
				},
				"[&>svg]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
