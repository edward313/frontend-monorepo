import { Checkbox, CheckboxProps } from "@repo/ui/components/checkbox";
import { cn } from "@repo/ui/utils/cn";
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
	description?: string;
	classNameWrapper?: string;
} & CheckboxProps;

export const RHFCheckbox = ({
	control,
	label,
	description,
	name,
	classNameWrapper,
	...props
}: Props) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				return (
					<FormItem
						className={cn("flex flex-row items-start gap-2", classNameWrapper)}
					>
						<FormControl>
							<Checkbox
								{...props}
								className="mt-1"
								checked={field.value ?? false}
								onCheckedChange={(checked) => {
									field.onChange(checked === true);
									props?.onCheckedChange?.(checked);
								}}
							/>
						</FormControl>
						<div>
							<FormLabel className="text-sm mt-0.5 font-normal">
								{label}
							</FormLabel>
							{description && (
								<FormDescription className="text-sm font-normal">
									{description}
								</FormDescription>
							)}
							<FormMessage />
						</div>
					</FormItem>
				);
			}}
		/>
	);
};
