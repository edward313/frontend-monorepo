"use client";

import {
	MultiCombobox,
	type MultiComboboxProps,
} from "@repo/ui/components/multi-combobox";
import type { Option } from "@repo/ui/types/common";
import { cn } from "@repo/ui/utils/cn";
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
	onChange?: (options: Option[]) => void;
	onOpenChange?: (open: boolean) => void;
} & Omit<MultiComboboxProps, "value" | "onChange">;

const indexFirstError = 0;

export function RHFMultiCombobox({
	control,
	name,
	label,
	classNameWrapper,
	description,
	required,
	options,
	onChange,
	onOpenChange,
	...props
}: Props) {
	const {
		formState: { errors },
	} = useFormContext();
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
			render={({ field, fieldState: { invalid } }) => (
				<FormItem className={cn("flex flex-col", classNameWrapper)}>
					<FormLabel>
						{label} {required && <span className="text-destructive">*</span>}
					</FormLabel>

					<MultiCombobox
						{...props}
						{...field}
						onOpenChange={onOpenChange}
						options={options}
						onChange={(options) => {
							field.onChange(options.map((option) => option.id));
							onChange?.(options);
						}}
						value={field.value}
						isForm
						error={error}
						className={cn(
							invalid && "border-destructive bg-destructive/5 text-destructive",
						)}
					/>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
