import { Separator } from "@repo/ui/components/separator";
import { cn } from "@repo/ui/utils/cn";
import type React from "react";

type Props = {
	title: string;
	className?: string;
	children?: React.ReactNode;
};

export const FieldSet = ({ title, className, children }: Props) => {
	return (
		<>
			<div className={cn("flex items-center gap-2", className)}>
				<p className="shrink-0 text-xs font-medium text-description">{title}</p>
				<Separator className="flex-1" />
			</div>
			{children}
		</>
	);
};
