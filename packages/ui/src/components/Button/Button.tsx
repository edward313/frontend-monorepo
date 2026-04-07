import { cn } from "@repo/ui/utils/cn";
import React from "react";

type LoaderProps = React.SVGProps<SVGSVGElement> & {
	width?: number | string;
	height?: number | string;
};

const Loader = ({
	width = "1.8rem",
	height = "1.8rem",
	style,
	...props
}: LoaderProps) => (
	<svg
		{...props}
		style={{ width, height, ...style }}
		xmlns="http://www.w3.org/2000/svg"
		stroke="#fff"
		className="mantine-0"
		viewBox="0 0 38 38"
	>
		<g
			fill="none"
			fillRule="evenodd"
			strokeWidth="5"
			transform="translate(2.5 2.5)"
		>
			<circle cx="16" cy="16" r="16" strokeOpacity="0.5"></circle>
			<path d="M32 16c0-9.94-8.06-16-16-16">
				<animateTransform
					attributeName="transform"
					dur="1s"
					from="0 16 16"
					repeatCount="indefinite"
					to="360 16 16"
					type="rotate"
				></animateTransform>
			</path>
		</g>
	</svg>
);

type ButtonVariant = "primary" | "outline" | "danger-outline" | "none";

type ButtonProps = Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	"type"
> & {
	type?: ButtonVariant;
	buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
	loading?: boolean;
	fullWidth?: boolean;
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	leftSection?: React.ReactNode;
	loaderProps?: LoaderProps;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			disabled,
			loading = false,
			fullWidth = false,
			type = "primary",
			buttonType = "button",
			iconLeft,
			iconRight,
			onClick,
			leftSection,
			loaderProps,
			...props
		},
		ref,
	) => {
		const isOutline = type === "outline";
		const typeClass =
			{
				primary: "bg-[var(--primary-color)] text-white",
				outline:
					"bg-white border border-[var(--primary-color)] text-[var(--primary-color)]",
				"danger-outline":
					"bg-white border border-[#F82626] text-[#F82626] px-6 py-[11px]",
				none: "bg-transparent border border-black/10 text-[var(--text-color)] px-0 py-3 h-fit w-fit",
			}[type] ?? "bg-[var(--primary-color)] text-white";

		const hoverClass = disabled
			? ""
			: isOutline
				? "hover:bg-[rgba(12,166,237,0.10)]"
				: "hover:bg-[#43C0FA]";

		const disabledClass = disabled
			? isOutline
				? "bg-white text-[#B8B8B8] border-[#B8B8B8] cursor-default"
				: "bg-[#B8B8B8] text-white cursor-not-allowed"
			: "";

		return (
			<button
				disabled={disabled}
				onClick={onClick}
				data-full-width={fullWidth}
				className={cn(
					"inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold outline-none transition-colors cursor-pointer data-[full-width=true]:w-full",
					typeClass,
					hoverClass,
					disabledClass,
					className,
				)}
				type={buttonType}
				ref={ref}
				{...props}
			>
				{(leftSection || loading) && (
					<span className="inline-flex items-center" data-position="left">
						{loading ? <Loader {...loaderProps} /> : leftSection}
					</span>
				)}
				{iconLeft}
				{children}
				{iconRight}
			</button>
		);
	},
);

Button.displayName = "Button";

export default Button;
