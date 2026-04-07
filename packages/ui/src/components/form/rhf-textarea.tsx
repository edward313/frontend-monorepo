"use client";
import { Textarea } from "@repo/ui/components/textarea";
import { cn } from "@repo/ui/utils/cn";
import { Loader } from "lucide-react";
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
	placeholder?: string;
	classNameWrapper?: string;
	description?: string;
	loading?: boolean;
} & React.ComponentProps<"textarea">;

export const RHFTextarea = ({
	control,
	name,
	label,
	placeholder,
	classNameWrapper,
	description,
	required,
	disabled,
	loading = false,
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
						<div className="relative w-full">
							<Textarea
								{...props}
								{...field}
								aria-invalid={invalid}
								id={name}
								placeholder={placeholder}
								className={cn(props.className)}
								disabled={disabled || loading}
							/>
							{loading && (
								<Loader
									size={16}
									className="animate-spin absolute top-2 right-2 opacity-50"
								/>
							)}
						</div>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
