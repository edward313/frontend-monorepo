import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { cn } from "@repo/ui/utils/cn";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs hover:bg-foreground/10",
				ghost: "bg-tranparent text-foreground shadow-xs hover:bg-foreground/10",
				link: "text-primary underline-offset-4 hover:underline",
				destructive_not_outline: "text-destructive",
				outline_blue:
					"border border-blue-700 text-blue-700 shadow-xs hover:bg-blue-700/10",
				warning:
					"bg-orange-500 text-white shadow-xs hover:bg-orange-600 focus-visible:ring-orange-200 dark:focus-visible:ring-orange-400 dark:bg-orange-600",
				outline_destructive:
					"border border-destructive text-destructive shadow-xs hover:bg-destructive/10",
				outline_success:
					"border border-green-600 text-green-600 shadow-xs hover:bg-green-600/10",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "lg",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	tooltip = "",
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		tooltip?: string;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Comp
						data-slot="button"
						className={cn(buttonVariants({ variant, size, className }))}
						{...props}
					/>
				</TooltipTrigger>
				{tooltip && <TooltipContent>{tooltip}</TooltipContent>}
			</Tooltip>
		</TooltipProvider>
	);
}

export { Button, buttonVariants };
