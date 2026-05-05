"use client";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { useRouter } from "@repo/i18n/navigation";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/utils/cn";

export type ButtonGoBackProps = {
	href?: string;
	className?: string;
};

const ButtonGoBack = ({ href, className }: ButtonGoBackProps) => {
	const router = useRouter();
	return (
		<Button
			size="icon"
			className={cn(
				"size-8 bg-background text-foreground hover:bg-foreground/10 cursor-pointer",
				className,
			)}
		>
			<CaretLeftIcon />
		</Button>
	);
};

export default ButtonGoBack;
