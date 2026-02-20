import type * as React from "react";
import { cn } from "./utils/cn";

export type InputProps = {
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	onChange: (value: string) => void;
	value?: string | number;
	loading?: boolean;
	options?: {
		value: string;
		label: string;
	}[];
	isShowSelect?: boolean;
	selectValue?: string;
	onChangeSelect?: (value: string) => void;
	disabledSelect?: boolean;
	allowClear?: boolean;
} & Omit<React.ComponentProps<"input">, "onChange" | "prefix" | "value">;

function Input({
	className,
	type,
	prefix,
	suffix,
	onChange,
	value,
	disabled,
	loading,
	options,
	isShowSelect,
	selectValue,
	onChangeSelect,
	disabledSelect,
	allowClear,
	...props
}: InputProps) {
	return (
		<div className="relative flex items-center">
			{prefix && (
				<div className="absolute left-0 flex items-center justify-center text-muted-foreground/80 ps-3 peer-disabled:opacity-50">
					{prefix}
				</div>
			)}
			<input
				type={type}
				data-slot="input"
				className={cn(
					"pe-9 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-white px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
					"focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:bg-destructive/5 aria-invalid:placeholder:text-destructive",
					className,
				)}
				{...props}
				disabled={disabled || loading}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					onChange(event.currentTarget.value)
				}
				value={value ?? ""}
			/>
		</div>
	);
}

export { Input };
