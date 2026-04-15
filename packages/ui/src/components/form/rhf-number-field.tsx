"use client";
import {
	InputNumber,
	type InputNumberProps,
} from "@repo/ui/components/input-number";
import type React from "react";
import type { Control } from "react-hook-form";
import {
	FormControl,
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
	loading?: boolean;
	onValueChange?: (value: number | string | undefined) => void;
} & Omit<InputNumberProps, "value" | "onValueChange">;

export const RHFNumberField = ({
	control,
	name,
	label,
	classNameWrapper,
	description,
	required,
	loading = false,
	onValueChange,
	...props
}: Props) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState: { invalid } }) => (
				<FormItem className={classNameWrapper}>
					<FormLabel htmlFor={name}>
						{label} {required && <span className="text-destructive">*</span>}
					</FormLabel>
					<FormControl>
						<InputNumber
							{...props}
							name={name}
							value={field.value}
							invalid={invalid}
							onValueChange={(value) => {
								field.onChange(value);
								onValueChange?.(value);
							}}
							loading={loading}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export const RHFNumberfield = RHFNumberField;
