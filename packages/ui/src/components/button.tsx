import { Slot } from "@radix-ui/react-slot";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { cn } from "@repo/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

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

type LoaderProps = React.SVGProps<SVGSVGElement> & {
	width?: string;
	height?: string;
};

const Loader = ({
	width = "1.4rem",
	height = "1.4rem",
	style,
	...props
}: LoaderProps) => (
	<svg
		{...props}
		style={{ width, height, ...style }}
		xmlns="http://www.w3.org/2000/svg"
		stroke="#fff"
		className={`mantine-0 animate-spin ${props.className ?? ""}`}
		viewBox="0 0 38 38"
	>
		<g
			fill="none"
			fillRule="evenodd"
			strokeWidth="5"
			transform="translate(2.5 2.5)"
		>
			<circle cx="16" cy="16" r="16" strokeOpacity="0.5" />
			<path d="M32 16c0-9.94-8.06-16-16-16">
				<animateTransform
					attributeName="transform"
					dur="1s"
					from="0 16 16"
					repeatCount="indefinite"
					to="360 16 16"
					type="rotate"
				/>
			</path>
		</g>
	</svg>
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	tooltip = "",
	loading = false,
	leftSection,
	loaderProps,
	disabled,
	children,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		tooltip?: string;
		loading?: boolean;
		leftSection?: React.ReactNode;
		loaderProps?: LoaderProps;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Comp
						data-slot="button"
						className={cn(buttonVariants({ variant, size, className }))}
						disabled={disabled || loading}
						{...props}
					>
						{(leftSection || loading) && (
							<span className="inline-flex items-center" data-position="left">
								{loading ? <Loader {...loaderProps} /> : leftSection}
							</span>
						)}
						{children}
					</Comp>
				</TooltipTrigger>
				{tooltip && <TooltipContent>{tooltip}</TooltipContent>}
			</Tooltip>
		</TooltipProvider>
	);
}

export { Button, buttonVariants };
