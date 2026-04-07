"use client";

import { Combobox, type ComboboxProps } from "@repo/ui/components/combobox";
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

type BaseProps = {
	control: Control<any>;
	name: string;
	label?: string;
	className?: string;
	classNameWrapper?: string;
	description?: string;
	required?: boolean;
	onValueChange?: (value: string) => void;
} & Omit<ComboboxProps, "value" | "onChange">;

type ComboboxPropsAllowClear = {
	allowClear: true;
	onChange?: (option: Option | null) => void;
} & BaseProps;

type ComboboxPropsNoAllowClear = {
	allowClear?: false;
	onChange?: (option: Option) => void;
} & BaseProps;

export type RHFComboboxProps =
	| ComboboxPropsAllowClear
	| ComboboxPropsNoAllowClear;

const indexFirstError = 0;

export function RHFCombobox({
	control,
	name,
	label,
	classNameWrapper,
	description,
	required,
	allowClear = false,
	onChange,
	onValueChange,
	...props
}: RHFComboboxProps) {
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
			render={({ field }) => (
				<FormItem className={cn("flex flex-col", classNameWrapper)}>
					<FormLabel>
						{label} {required && <span className="text-destructive">*</span>}
					</FormLabel>
					<Combobox
						{...props}
						{...field}
						allowClear={allowClear}
						onChange={(option: any) => {
							field.onChange(option?.id ?? null);
							onChange?.(option);
						}}
						value={field.value}
						isForm
						onValueChange={onValueChange}
						error={error}
						onBlur={props.onBlur}
					/>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
