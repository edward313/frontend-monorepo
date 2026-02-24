import { CaretUpDown, Check, X } from "@phosphor-icons/react";
import { Badge } from "@repo/ui/components/badge";
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
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type {
	ControllerRenderProps,
	FieldError,
	FieldErrorsImpl,
	Merge,
} from "react-hook-form";

export type MultiComboboxProps = {
	className?: string;
	loading?: boolean;
	trigger?: React.ReactNode;
	options: Option[];
	placeholder?: string;
	disabled?: boolean;
	isCloseSearch?: boolean;
	isForm?: boolean;
	onOpenChange?: (open: boolean) => void;
	value: Option["id"][];
	onChange: (option: Option[]) => void;
	error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	count?: number;
} & Partial<Omit<ControllerRenderProps<any, string>, "value" | "onChange">>;

const MultiCombobox = ({
	className,
	loading,
	trigger,
	options,
	placeholder,
	disabled,
	isCloseSearch = false,
	isForm = false,
	onOpenChange,
	value,
	onChange,
	error,
	count = 2,
	...props
}: MultiComboboxProps) => {
	const tCommon = useTranslations("Common");
	const refInput = useRef<HTMLInputElement>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (error) {
			setOpen(true);
			wait(0, () => refInput.current?.focus());
		}
	}, [error, refInput]);

	const renderButtonTrigger = (trigger: React.ReactNode, isForm: boolean) => {
		const buttonTrigger = (
			<Button
				{...props}
				variant="outline"
				disabled={disabled || loading}
				className={cn(
					"w-full min-h-10 h-auto py-1 justify-start has-[>svg]:px-3 px-3 hover:bg-transparent flex-wrap",
					open && "border-ring ring-ring/30 ring-[3px]",
					!(value || []).length && "text-muted-foreground",
					className,
				)}
			>
				{(value || [])?.length
					? (value || []).map((item, index) => {
							const getData = options.find((option) => option.id === item);
							if (index < count) {
								if (getData) {
									return (
										<Badge
											key={item}
											variant="outline"
											className="whitespace-normal"
										>
											<div className="truncate max-w-[80px]">
												{getData.name}
											</div>
											<div
												onClick={(event) => {
													event.stopPropagation();
													event.preventDefault();
													const listOption = (value || [])
														.map((itemValue) => {
															return options.find(
																(option) => option.id === itemValue,
															);
														})
														.filter(Boolean);

													return onChange(
														listOption.filter(
															(option) => option?.id !== item,
														) as Option[],
													);
												}}
											>
												<X />
											</div>
										</Badge>
									);
								}
							}
							if (index === count) {
								const remaining = value.length - count;
								return (
									<Badge
										key={item}
										variant="outline"
										className="whitespace-normal"
									>
										+{remaining}
									</Badge>
								);
							}
							return null;
						})
					: placeholder || "Chọn dữ liệu"}

				{loading ? (
					<Loader
						size={16}
						className="ml-auto h-4 w-4 opacity-50 animate-spin"
					/>
				) : (value || []).length ? (
					<div
						className="ml-auto h-4 w-4 opacity-50"
						onClick={(event) => {
							event.stopPropagation();
							event.preventDefault();
							onChange([]);
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
		<Popover
			open={open}
			onOpenChange={(open) => {
				setOpen(open);
				onOpenChange?.(open);
			}}
		>
			<PopoverTrigger asChild>
				{renderButtonTrigger(trigger, isForm)}
			</PopoverTrigger>
			<PopoverContent className="max-w-full p-0">
				<Command
					filter={(value, search) => {
						return encodeStr(value).includes(encodeStr(search)) ? 1 : 0;
					}}
				>
					{!isCloseSearch && (
						<CommandInput
							placeholder={`${tCommon("search")}...`}
							className="h-9"
							ref={refInput}
						/>
					)}
					<CommandList>
						<CommandEmpty>{tCommon("no-data")}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = (value || []).includes(option.id);
								return (
									<CommandItem
										value={option.name}
										key={option.id}
										onSelect={() => {
											const listOption = (value || [])
												.map((item) => {
													return options.find((option) => option.id === item);
												})
												.filter(Boolean);

											const getData = (value || []).find(
												(item) => item === option.id,
											);

											if (getData) {
												return onChange(
													listOption.filter(
														(item) => item?.id !== option.id,
													) as Option[],
												);
											}

											return onChange([...listOption, option] as Option[]);
										}}
										data-item-selected={isSelected}
									>
										{option.name}
										<Check
											className={cn(
												"ml-auto",
												isSelected ? "opacity-100" : "opacity-0",
											)}
										/>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default MultiCombobox;
