"use client";

import type { RadioGroupProps } from "@radix-ui/react-radio-group";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import { Skeleton } from "@repo/ui/components/skeleton";
import type { Option } from "@repo/ui/types/common";
import { cn } from "@repo/ui/utils/cn";
import type { Control } from "react-hook-form";
import {
	FormControl,
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
	classNameWrapperOptions?: string;
	options: Option[];
	isShowLabel?: boolean;
	loading?: boolean;
} & RadioGroupProps;

export function RHFRadioGroup({
	control,
	name,
	label,
	classNameWrapper,
	classNameWrapperOptions,
	options,
	required,
	isShowLabel = false,
	loading = false,
	...props
}: Props) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("space-y-2", classNameWrapper)}>
					<FormLabel>
						{label} {required && <span className="text-destructive">*</span>}
					</FormLabel>
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							value={field.value}
							className={cn("flex flex-row", classNameWrapperOptions)}
							{...props}
						>
							{loading && <Skeleton className="w-full h-10" />}
							{loading && <Skeleton className="w-full h-10" />}
							{!loading &&
								options.map((option) => (
									<FormItem
										key={option.id}
										className="flex flex-row items-center gap-2"
									>
										<FormControl>
											<RadioGroupItem value={option.id.toString()} />
										</FormControl>
										<FormLabel className="font-normal">
											{isShowLabel ? option.label || option.name : option.name}
										</FormLabel>
									</FormItem>
								))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
