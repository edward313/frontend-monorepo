import { cn } from "@repo/ui/utils/cn";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

export type SuffixSelectlectProps = {
	options?: {
		value: string;
		label: string;
	}[];
	isShowSelect?: boolean;
	selectValue?: string;
	onChangeSelect?: (value: string) => void;
	multiple?: boolean;
	className?: string;
	disabledSelect?: boolean;
};

const SuffixSelectlect = ({
	options,
	isShowSelect,
	selectValue,
	onChangeSelect,
	multiple,
	className,
	disabledSelect,
}: SuffixSelectlectProps) => {
	return (
		isShowSelect && (
			<div className="relative flex -mr-3 ml-1 z-50">
				<select
					data-slot="select-native"
					value={selectValue}
					className={cn(
						"peer text-foreground focus-visible:border-ring focus-visible:ring-ring/50 has-[option[disabled]:checked]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-full cursor-pointer appearance-none items-center rounded-r-md border-l text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-full py-2",
						multiple || disabledSelect
							? "[&_option:checked]:bg-accent px-2.5"
							: "ps-3 pe-8",
						className,
					)}
					onChange={(event) => onChangeSelect?.(event.target.value)}
					disabled={disabledSelect}
				>
					{options?.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{!multiple && !disabledSelect && (
					<span className="text-muted-foreground/80 peer-aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center peer-disabled:opacity-50">
						<ChevronDownIcon size={16} aria-hidden="true" />
					</span>
				)}
			</div>
		)
	);
};

export default SuffixSelectlect;
