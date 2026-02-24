import { cn } from "@repo/ui/utils/cn";
import type React from "react";
import { NumericFormat } from "react-number-format";
import type { NumericFormatProps } from "react-number-format";
import { useSuffixArea } from "@repo/ui/components/use-suffix-area";
import type { SuffixSelectlectProps } from "@repo/ui/components/prefix-select";

export type InputNumberProps = {
	name?: string;
	loading?: boolean;
	invalid?: boolean;
	value: number;
	onValueChange: (value: number | string | undefined) => void;
	prefixIcon?: React.ReactNode;
	suffixIcon?: React.ReactNode;
} & Omit<NumericFormatProps, "onValueChange"> &
	SuffixSelectlectProps;

const InputNumber = ({
	name,
	loading,
	invalid = false,
	disabled,
	prefixIcon,
	suffixIcon,
	className,
	placeholder,
	value,
	onValueChange,
	defaultValue,
	options,
	isShowSelect,
	selectValue,
	onChangeSelect,
	disabledSelect,
	...props
}: InputNumberProps) => {
	const { RightArea, inputPaddingStyle, inputPaddingClass } = useSuffixArea(
		{
			value,
			loading,
			disabled,
			suffixIcon,
			onClear: () => onValueChange(""),
			options,
			isShowSelect,
			selectValue,
			onChangeSelect,
			disabledSelect,
		},
		{ enabled: true, extraGapPx: 8, fallbackPaddingPx: 116 },
	);
	return (
		<div className="relative flex items-center">
			{prefixIcon && (
				<div className="absolute left-0 flex items-center justify-center text-muted-foreground/80 ps-3 peer-disabled:opacity-50">
					{prefixIcon}
				</div>
			)}
			<NumericFormat
				{...props}
				value={value}
				aria-invalid={invalid}
				id={name}
				disabled={disabled || loading}
				placeholder={placeholder}
				className={cn(
					"pe-9 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-white px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
					"focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:bg-destructive/5 aria-invalid:placeholder:text-destructive",
					{
						"ps-9": prefixIcon,
						[inputPaddingClass ?? ""]: !!inputPaddingClass,
					},
					className,
				)}
				style={inputPaddingStyle}
				onValueChange={(values) => onValueChange(values.floatValue)}
				thousandSeparator="," 
			/>

			{RightArea}
		</div>
	);
};

export default InputNumber;
