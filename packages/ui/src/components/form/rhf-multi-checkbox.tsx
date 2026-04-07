import {
	MultiCheckbox,
	type MultiCheckboxProps,
} from "@repo/ui/components/multi-checkbox";
import React from "react";
import type { Control } from "react-hook-form";
import { twMerge } from "tailwind-merge";
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
	description?: string;
	classNameWrapper?: string;
	classNameWrapperOptions?: string;
	onChange?: (value: string[] | number[]) => void;
} & Omit<MultiCheckboxProps, "value" | "onChange">;

export const RHFMultiCheckbox = ({
	control,
	name,
	label,
	description,
	classNameWrapper,
	classNameWrapperOptions,
	required,
	...props
}: Props) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={twMerge("flex flex-col gap-2", classNameWrapper)}>
					{(label || description) && (
						<div>
							{label && (
								<FormLabel className="text-base">
									{label}
									{required && <span className="text-destructive">*</span>}
								</FormLabel>
							)}
							{description && <FormDescription>{description}</FormDescription>}
						</div>
					)}

					<MultiCheckbox
						{...props}
						control={control}
						name={name}
						classNameWrapperOptions={classNameWrapperOptions}
						value={field.value}
						onChange={(value) => {
							field.onChange(value || []);
						}}
						isForm
					/>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
