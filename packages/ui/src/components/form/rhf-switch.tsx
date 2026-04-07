"use client";

import type { SwitchProps } from "@radix-ui/react-switch";
import { Label } from "@repo/ui/components/label";
import { Switch } from "@repo/ui/components/switch";
import { cn } from "@repo/ui/utils/cn";
import type { Control } from "react-hook-form";
import { FormControl, FormField, FormItem } from "./base";

type Props = {
	control: Control<any>;
	name: string;
	label?: string;
	classNameWrapper?: string;
} & SwitchProps;

export function RHFSwitch({ control, name, label, classNameWrapper }: Props) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem
					className={cn("flex items-center space-x-2", classNameWrapper)}
				>
					<FormControl>
						<Switch
							id={name}
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					</FormControl>
					<Label htmlFor={name}>{label}</Label>
				</FormItem>
			)}
		/>
	);
}
