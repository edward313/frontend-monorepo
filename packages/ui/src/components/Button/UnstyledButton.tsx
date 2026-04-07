import { cn } from "@repo/ui/utils/cn";
import type * as React from "react";
import { forwardRef } from "react";

type UnstyledButtonProps = React.ComponentPropsWithoutRef<"button"> & {
	component?: React.ElementType;
};

const UnstyledButton = forwardRef<HTMLElement, UnstyledButtonProps>(
	(
		{ component = "button", type = "button", className, children, ...props },
		ref,
	) => {
		const Comp = component as React.ElementType;

		return (
			<Comp
				{...props}
				ref={ref}
				className={cn(
					className,
					"bg-transparent cursor-pointer border-0 p-0 appearance-none text-base text-left no-underline text-[inherit] touch-manipulation [-webkit-tap-highlight-color:transparent]",
				)}
				type={type}
			>
				{children}
			</Comp>
		);
	},
);

UnstyledButton.displayName = "UnstyledButton";

export default UnstyledButton;
