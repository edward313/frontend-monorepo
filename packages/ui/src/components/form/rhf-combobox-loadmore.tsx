"use client";

import {
	ComboboxLoadMore,
	type ComboboxLoadMoreProps,
} from "@repo/ui/components/combobox-loadmore";
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
} & Omit<ComboboxLoadMoreProps, "value" | "onChange">;

type ComboboxPropsAllowClear = {
	allowClear: true;
	onChange?: (option: Option | null) => void;
} & BaseProps;

type ComboboxPropsNoAllowClear = {
	allowClear?: false;
	onChange?: (option: Option) => void;
} & BaseProps;

export type RHFComboboxLoadMoreProps =
	| ComboboxPropsAllowClear
	| ComboboxPropsNoAllowClear;

const indexFirstError = 0;

export function RHFComboboxLoadMore({
	control,
	name,
	label,
	classNameWrapper,
	description,
	required,
	onChange,
	onValueChange,
	fetchNextPage,
	hasNextPage,
	fetchPreviousPage,
	hasPreviousPage,
	isFetchingNextPage,
	isFetchingPreviousPage,
	...props
}: RHFComboboxLoadMoreProps) {
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
					<ComboboxLoadMore
						{...props}
						{...field}
						onChange={(option: any) => {
							field.onChange(option?.id);
							onChange?.(option);
						}}
						value={field.value}
						isForm
						onValueChange={onValueChange}
						error={error}
						fetchNextPage={fetchNextPage}
						hasNextPage={hasNextPage}
						fetchPreviousPage={fetchPreviousPage}
						hasPreviousPage={hasPreviousPage}
						isFetchingNextPage={isFetchingNextPage}
						isFetchingPreviousPage={isFetchingPreviousPage}
					/>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
