"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import type * as React from "react";
import { cn } from "@repo/ui/utils/cn";

function Popover({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
	className,
	align = "center",
	sideOffset = 4,
	fitTrigger = true,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
	fitTrigger?: boolean;
}) {
	// const listContainer = document.querySelectorAll("[role='dialog'][data-slot='dialog-content']");

	return (
		<PopoverPrimitive.Portal
		// container={listContainer?.length ? listContainer[listContainer.length - 1] : undefined}
		>
			<PopoverPrimitive.Content
				onCloseAutoFocus={(event) => {
					event.preventDefault();
				}}
				data-slot="popover-content"
				align={align}
				sideOffset={sideOffset}
				className={cn(
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in",
					fitTrigger ? "min-w-56 w-(--radix-popover-trigger-width)" : "w-full",
					className,
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
}

function PopoverAnchor({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
	return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
