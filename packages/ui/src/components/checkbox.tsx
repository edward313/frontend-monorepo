"use client";

import { cn } from "@repo/ui/utils/cn";
import * as React from "react";

type CheckboxClassNames = {
	root?: string;
	inner?: string;
	input?: string;
	icon?: string;
	label?: string;
};

export type CheckboxProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"onChange"
> & {
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onCheckedChange?: (checked: boolean) => void;
	classNames?: CheckboxClassNames;
	error?: boolean;
	color?: string;
	iconColor?: string;
	isRoot?: boolean;
	isSomeSelected?: boolean;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			checked,
			defaultChecked,
			disabled = false,
			onChange,
			onCheckedChange,
			className,
			classNames = {},
			children,
			error,
			color = "var(--primary)",
			iconColor = "#FFF",
			style,
			id,
			value,
			isRoot,
			isSomeSelected,
			...props
		},
		ref,
	) => {
		const reactId = React.useId();
		const checkboxId = id || `checkbox-${reactId}`;

		const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
			event,
		) => {
			onChange?.(event);
			onCheckedChange?.(event.target.checked);
		};

		return (
			<div
				style={
					{
						"--checkbox-color": color,
						"--checkbox-icon-color": iconColor,
						...style,
					} as React.CSSProperties
				}
				className={cn("flex items-center", className, classNames.root)}
			>
				<div
					className={cn("relative size-4 flex items-center", classNames.inner)}
				>
					<input
						{...props}
						defaultChecked={defaultChecked}
						disabled={disabled}
						data-error={!!error}
						className={cn(
							"peer size-4 appearance-none rounded-[4px] border border-[#8b8b8b] bg-white transition-colors",
							"checked:border-(--checkbox-color) checked:bg-(--checkbox-color)",
							"disabled:cursor-not-allowed disabled:border-black/5 disabled:bg-black/5",
							"data-[error=true]:border-destructive",
							classNames.input,
						)}
						onChange={handleChange}
						value={value}
						checked={checked}
						type="checkbox"
						id={checkboxId}
						ref={ref}
					/>
					{isRoot && isSomeSelected ? (
						<svg
							className={cn(
								"pointer-events-none absolute left-1/2 top-3/4 block -translate-x-1/2 translate-y-0.5 text-[var(--checkbox-icon-color)]",
								"opacity-0 transition-all duration-100",
								"peer-checked:opacity-100",
								classNames.icon,
							)}
							width="11"
							height="11"
							viewBox="0 0 11 11"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 0.5C9.82843 0.5 10.5 1.17157 10.5 2C10.5 2.82843 9.82843 3.5 9 3.5L2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5L9 0.5Z"
								fill="white"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							aria-hidden="true"
							className={cn(
								"pointer-events-none absolute inset-0 m-auto block w-[60%] -translate-y-[1px] text-[var(--checkbox-icon-color)]",
								"scale-50 opacity-0 transition-all duration-100",
								"peer-checked:scale-100 peer-checked:opacity-100",
								"peer-disabled:text-[#717171]",
								classNames.icon,
							)}
							viewBox="0 0 10 7"
						>
							<path
								fill="currentColor"
								fillRule="evenodd"
								d="M4 4.586L1.707 2.293A1 1 0 10.293 3.707l3 3a.997.997 0 001.414 0l5-5A1 1 0 108.293.293L4 4.586z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</div>
				{children && (
					<label
						htmlFor={checkboxId}
						data-disabled={disabled}
						className={cn(
							"ml-3 inline-flex leading-4 text-sm font-normal text-[#717171]",
							"data-[disabled=true]:cursor-not-allowed",
							classNames.label,
						)}
					>
						{children}
					</label>
				)}
			</div>
		);
	},
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
