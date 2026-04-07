"use client";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
	DatePicker,
	type DatePickerProps,
} from "@repo/ui/components/date-picker";
import { cn } from "@repo/ui/utils/cn";
import { useState } from "react";
import {
	type Control,
	type FieldError,
	type FieldErrorsImpl,
	type Merge,
	useFormContext,
} from "react-hook-form";
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
	isShowCheckbox?: boolean;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
} & Omit<DatePickerProps, "value" | "onChange">;

const indexFirstError = 0;

export const RHFDatePicker = ({
	control,
	name,
	label,
	classNameWrapper,
	description,
	required,
	isShowCheckbox = false,
	checked = true,
	onCheckedChange,
	...props
}: Props) => {
	const {
		formState: { errors },
	} = useFormContext();
	const [isChecked, setIsChecked] = useState(checked);
	let error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;

	const indexError = Object.keys(errors).findIndex(
		(keyField) => keyField === name,
	);

	if (indexError !== -1 && indexError === indexFirstError) {
		error = errors[Object.keys(errors)[indexError]];
	}

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("flex flex-col", classNameWrapper)}>
					<FormLabel className="truncate">
						{isShowCheckbox && (
							<Checkbox
								checked={isChecked}
								onCheckedChange={() => {
									setIsChecked(!isChecked);
									onCheckedChange?.(!isChecked);
								}}
								disabled={props.disabled}
							/>
						)}
						{label} {required && <span className="text-destructive">*</span>}
					</FormLabel>
					<DatePicker
						{...props}
						{...field}
						onChange={(date) => {
							field.onChange(date);
						}}
						value={field.value ? new Date(field.value) : undefined}
						isForm
						error={error}
						disabled={!isChecked || props.disabled}
					/>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
