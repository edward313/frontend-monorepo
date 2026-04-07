"use client";
import {
	DateRangePicker,
	type DateRangePickerProps,
} from "@repo/ui/components/date-range-picker";

import { cn } from "@repo/ui/utils/cn";
import type React from "react";
import type { DateRange } from "react-day-picker";
import type { Control } from "react-hook-form";
import {
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./base";

type Props = {
	control: Control<any>;
	name: string;
	label?: string;
	classNameWrapper?: string;
	description?: string;
	required?: boolean;
	onChange?: (dateRange: DateRange | undefined) => void;
} & Omit<DateRangePickerProps<DateRange>, "value" | "onChange">;

export const RHFDateRangePicker = ({
	control,
	name,
	label,
	classNameWrapper,
	description,
	required,
	onChange,
	...props
}: Props) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("flex flex-col", classNameWrapper)}>
					<FormLabel>
						{label} {required && <span className="text-destructive">*</span>}
					</FormLabel>
					<DateRangePicker
						{...props}
						value={field.value}
						onChange={(dateRange) => {
							field.onChange(dateRange);
							onChange?.(dateRange);
						}}
						isForm
					/>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
