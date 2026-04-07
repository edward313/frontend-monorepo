"use client";

import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import { Input, type InputProps } from "@repo/ui/components/input";
import { cn } from "@repo/ui/utils/cn";
import { type ComponentProps, useState } from "react";
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
	type?: ComponentProps<"input">["type"];
	label?: string;
	placeholder?: string;
	classNameWrapper?: string;
	description?: string;
	loading?: boolean;
	onChange?: (value: string) => void;
} & Omit<InputProps, "onChange">;

export const RHFTextfield = ({
	control,
	name,
	type = "text",
	label,
	placeholder,
	classNameWrapper,
	description,
	required,
	disabled,
	loading = false,
	onChange,
	value,
	prefix,
	suffix,
	...props
}: Props) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState: { invalid } }) => (
				<FormItem className={cn(classNameWrapper)}>
					<FormLabel htmlFor={name}>
						{label} {required && <span className="text-destructive">*</span>}
					</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<Input
								{...props}
								{...field}
								aria-invalid={invalid}
								id={name}
								type={
									type === "password"
										? showPassword
											? "text"
											: "password"
										: type
								}
								disabled={disabled || loading}
								placeholder={placeholder}
								className={cn("!bg", props.className)}
								value={value || field.value || ""}
								onChange={(value) => {
									field.onChange(value);
									!!onChange && onChange(value);
								}}
								prefix={prefix}
								suffix={
									suffix
										? suffix
										: type === "password" && (
												<div
													className="hover:bg-transparent cursor-pointer"
													onClick={() => setShowPassword((prev) => !prev)}
												>
													{showPassword ? (
														<EyeIcon size={16} />
													) : (
														<EyeClosedIcon size={16} />
													)}
												</div>
											)
								}
								onBlur={props.onBlur}
							/>
						</div>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
