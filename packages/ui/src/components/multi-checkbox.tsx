import { Checkbox, type CheckboxProps } from "@repo/ui/components/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@repo/ui/components/form";
import { Label } from "@repo/ui/components/label";
import type { Option } from "@repo/ui/types/common";
import React, { Fragment } from "react";
import type { Control } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type MultiCheckboxProps = {
	options: Option[];
	classNameWrapperOptions?: string;
	value: any[];
	onChange: (value: string[] | number[]) => void;
	isForm?: boolean;
	name?: string;
	control?: Control<any>;
} & Omit<CheckboxProps, "onChange" | "onCheckedChange" | "checked" | "value">;

const MultiCheckbox = ({
	name,
	control,
	options,
	classNameWrapperOptions,
	value,
	onChange,
	isForm = false,
	...props
}: MultiCheckboxProps) => {
	const renderItemCheckbox = (option: Option, isForm: boolean) => {
		const itemCheckbox = (
			<Checkbox
				{...props}
				aria-invalid={false}
				checked={value?.includes(option.id)}
				onCheckedChange={(checked) => {
					return checked
						? onChange([...(value || []), option?.id])
						: onChange(value?.filter((value: string) => value !== option.id));
				}}
			/>
		);

		if (isForm) {
			return (
				<FormItem className="flex flex-row items-center gap-2">
					<FormControl>{itemCheckbox}</FormControl>
					<FormLabel className="text-sm font-normal">
						{option?.label || option.name}
					</FormLabel>
				</FormItem>
			);
		}
		return (
			<div className="flex flex-row items-center gap-2">
				{itemCheckbox}
				<Label className="text-sm font-normal">{option.name}</Label>
			</div>
		);
	};

	return (
		<div className={twMerge("flex flex-col gap-2", classNameWrapperOptions)}>
			{isForm
				? options.map((option) => (
						<FormField
							key={option.id}
							control={control}
							name={name as string}
							render={() => {
								return renderItemCheckbox(option, isForm);
							}}
						/>
					))
				: options.map((option) => (
						<Fragment key={option.id}>
							<div>{renderItemCheckbox(option, isForm)}</div>
						</Fragment>
					))}
		</div>
	);
};

export default MultiCheckbox;
