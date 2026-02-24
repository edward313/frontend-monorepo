"use client";

import { CaretUpDown, Check, X } from "@phosphor-icons/react";
import { Button } from "@repo/ui/components/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@repo/ui/components/command";
import { FormControl } from "@repo/ui/components/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@repo/ui/components/popover";
import type { Option } from "@repo/ui/types/common";
import { wait } from "@repo/ui/utils";
import { cn } from "@repo/ui/utils/cn";
import { encodeStr } from "@repo/ui/utils/format-text";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import type {
	ControllerRenderProps,
	FieldError,
	FieldErrorsImpl,
	Merge,
} from "react-hook-form";

interface BaseComboboxProps
	extends Partial<
		Omit<ControllerRenderProps<any, string>, "value" | "onChange">
	> {
	className?: string;
	loading?: boolean;
	trigger?: React.ReactNode;
	options: Option[];
	optionsAddressRecent?: Option[];
	placeholder?: string;
	emptyString?: string;
	disabled?: boolean;
	closeOnSelect?: boolean;
	isCloseSearch?: boolean;
	isForm?: boolean;
	value: Option["id"];
	isShowCheckIcon?: boolean;
	isShowLabel?: boolean;
	showLabel?: string;
	onValueChange?: (value: string) => void;
	fitTrigger?: boolean;
	shouldFilter?: boolean;
	error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

interface ComboboxPropsAllowClear extends BaseComboboxProps {
	allowClear: true;
	onChange: (option: Option | null) => void;
}

interface ComboboxPropsNoAllowClear extends BaseComboboxProps {
	allowClear?: false; // default
	onChange: (option: Option) => void;
}

export type ComboboxProps = ComboboxPropsAllowClear | ComboboxPropsNoAllowClear;

export function Combobox({
	className,
	loading,
	trigger,
	options,
	optionsAddressRecent,
	placeholder,
	emptyString,
	disabled = false,
	allowClear = false,
	closeOnSelect = true,
	isCloseSearch = false,
	isForm = false,
	value,
	onChange,
	onValueChange,
	isShowCheckIcon = true,
	isShowLabel = false,
	showLabel = "",
	fitTrigger = true,
	shouldFilter = true,
	error,
	...props
}: ComboboxProps) {
	const tCommon = useTranslations("Common");
	const refInput = React.useRef<HTMLInputElement>(null);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (error) {
			setOpen(true);
			wait(0, () => refInput.current?.focus());
		}
	}, [error, refInput]);

	const renderCommandItem = (option: Option) => {
		const isSelected = option.id === value;
		const showText = isShowLabel ? option.label || option.name : option.name;
		const objectKeyValue = Object.keys(option).reduce((prev, key) => {
			if (key !== "id" && key !== "label" && key !== "disabled") {
				(prev as any)[key] = option[key];
			}
			return prev;
		}, {});

		const textValue = Object.values(objectKeyValue)
			.map((itemOption) => itemOption)
			.join("");
		return (
			<CommandItem
				disabled={option.disabled}
				value={textValue}
				key={option.id}
				onSelect={() => {
					if (closeOnSelect) {
						setOpen(false);
					}

					if (allowClear) {
						onChange(
							(`${value}` !== `${option.id}` ? option : null) as Option & null,
						);
					} else {
						onChange(option);
					}
				}}
				data-item-selected={isSelected}
			>
				{showText}
				{isShowCheckIcon && (
					<Check
						className={cn("ml-auto", isSelected ? "opacity-100" : "opacity-0")}
					/>
				)}
			</CommandItem>
		);
	};

	const renderButtonTrigger = (trigger: React.ReactNode, isForm: boolean) => {
		const itemShow = optionsAddressRecent
			? [...options, ...optionsAddressRecent].find(
					(option) => option.id === value,
				)
			: options.find((option) => option.id === value);
		const showText =
			showLabel ||
			(isShowLabel ? itemShow?.label || itemShow?.name : itemShow?.name);

		const buttonTrigger = (
			<Button
				{...props}
				aria-expanded={open}
				variant="outline"
				disabled={disabled || loading}
				className={cn(
					"justify-between px-3 hover:bg-transparent has-[>svg]:px-3",
					"aria-invalid:bg-destructive/5 aria-invalid:text-destructive",
					open && "border-ring ring-[3px] ring-ring/30",
					!value && "text-muted-foreground",
					className,
				)}
			>
				<div className="flex w-full truncate">
					{value ? showText : placeholder || "Chọn dữ liệu"}
				</div>

				{loading ? (
					<Loader
						size={16}
						className="ml-auto h-4 w-4 opacity-50 animate-spin"
					/>
				) : value && allowClear ? (
					<div
						className="ml-auto h-4 w-4 opacity-50"
						onClick={(event) => {
							event.stopPropagation();
							event.preventDefault();
							onChange(null as Option & null);
						}}
					>
						<X />
					</div>
				) : (
					<CaretUpDown className="ml-auto h-4 w-4 opacity-50" />
				)}
			</Button>
		);

		if (isForm) {
			return <FormControl>{trigger ? trigger : buttonTrigger}</FormControl>;
		}
		return trigger ? trigger : buttonTrigger;
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{renderButtonTrigger(trigger, isForm)}
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command
					className="min-w-20"
					filter={(value, search) => {
						return encodeStr(value).includes(encodeStr(search)) ? 1 : 0;
					}}
					shouldFilter={shouldFilter}
				>
					{!isCloseSearch && (
						<CommandInput
							placeholder={`${tCommon("search")}...`}
							className={"h-9"}
							ref={refInput}
							onValueChange={onValueChange}
						/>
					)}
					<CommandList className="min-w-40">
						{loading ? (
							<CommandEmpty>
								<div className="flex items-center justify-center gap-2">
									<Loader className="animate-spin" size={16} />
									{`${tCommon("searching")}...`}
								</div>
							</CommandEmpty>
						) : (
							<React.Fragment>
								<CommandEmpty>
									{emptyString ? emptyString : tCommon("no-data")}
								</CommandEmpty>
								<CommandGroup>
									{options.map((option) => {
										return renderCommandItem(option);
									})}
								</CommandGroup>
								{!!optionsAddressRecent?.length && (
									<CommandGroup
										heading="Đã chọn gần đây"
										className="[&_[cmdk-group-heading]]:bg-gray-50 [&_[cmdk-group-heading]]:-mx-2 [&_[cmdk-group-heading]]:text-sm [cmdk-group-heading]]:text-accent-foreground"
									>
										{optionsAddressRecent.map((option) => {
											return renderCommandItem(option);
										})}
									</CommandGroup>
								)}
							</React.Fragment>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
