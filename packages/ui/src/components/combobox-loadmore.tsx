"use client";

import { CaretUpDown, Check, X } from "@phosphor-icons/react";
import type {
	FetchNextPageOptions,
	FetchPreviousPageOptions,
	InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import type {
	ControllerRenderProps,
	FieldError,
	FieldErrorsImpl,
	Merge,
} from "react-hook-form";
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
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/utils/cn";
import type { Option } from "@repo/ui/types/common";
import { wait } from "@repo/ui/utils";
import { encodeStr } from "@repo/ui/utils/format-text";

interface BaseComboboxLoadMoreProps
	extends Partial<
		Omit<ControllerRenderProps<any, string>, "value" | "onChange">
	> {
	className?: string;
	loading?: boolean;
	trigger?: React.ReactNode;
	options: Option[];
	placeholder?: string;
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
	fetchNextPage: (
		options?: FetchNextPageOptions,
	) => Promise<InfiniteQueryObserverResult<any>>;
	fetchPreviousPage: (
		options?: FetchPreviousPageOptions,
	) => Promise<InfiniteQueryObserverResult<any>>;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	isFetchingNextPage: boolean;
	isFetchingPreviousPage: boolean;
	estimateSize?: number;
	overscan?: number;
	error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

interface ComboboxLoadMorePropsAllowClear extends BaseComboboxLoadMoreProps {
	allowClear: true;
	onChange: (option: Option | null) => void;
}

interface ComboboxLoadMorePropsNoAllowClear extends BaseComboboxLoadMoreProps {
	allowClear?: false; // default
	onChange: (option: Option) => void;
}

export type ComboboxLoadMoreProps =
	| ComboboxLoadMorePropsAllowClear
	| ComboboxLoadMorePropsNoAllowClear;

export function ComboboxLoadMore({
	className,
	loading,
	trigger,
	options,
	placeholder,
	disabled = false,
	allowClear = false,
	closeOnSelect = true,
	isCloseSearch = false,
	isForm = false,
	value,
	onChange,
	onValueChange,
	error,
	isShowCheckIcon = true,
	isShowLabel = false,
	showLabel = "",
	fitTrigger = true,
	fetchNextPage,
	hasNextPage,
	fetchPreviousPage,
	hasPreviousPage,
	isFetchingNextPage,
	isFetchingPreviousPage,
	estimateSize = 36,
	overscan = 5,
	...props
}: ComboboxLoadMoreProps) {
	const tCommon = useTranslations("Common");
	const refInput = useRef<HTMLInputElement>(null);
	const [parentRef, setParentRef] = useState<HTMLDivElement | null>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (error) {
			setOpen(true);
			wait(0, () => refInput.current?.focus());
		}
	}, [error, refInput]);

	const renderButtonTrigger = (trigger: React.ReactNode, isForm: boolean) => {
		const itemShow = options.find((option) => option.id === value);
		const showText = isShowLabel
			? itemShow?.label || itemShow?.name
			: itemShow?.name;
		const buttonTrigger = (
			<Button
				{...props}
				aria-expanded={open}
				variant="outline"
				disabled={disabled || loading}
				className={cn(
					"justify-between has-[>svg]:px-3 px-3 hover:bg-transparent",
					"aria-invalid:text-destructive aria-invalid:bg-destructive/5",
					open && "border-ring ring-ring/30 ring-[3px]",
					!value && "text-muted-foreground",
					className,
				)}
			>
				{value ? showText : placeholder || "Chọn dữ liệu"}

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

	const allItems = options ?? [];

	const virtualizer = useVirtualizer({
		count: hasNextPage ? allItems.length + 1 : allItems.length,
		getScrollElement: () => parentRef,
		estimateSize: () => estimateSize,
		overscan: overscan,
	});

	// Cập nhật virtualizer khi popover mở
	useLayoutEffect(() => {
		if (open && parentRef) {
			virtualizer.measure();
		}
	}, [open, virtualizer, parentRef]);

	// Auto fetch next page when scrolling to bottom
	useEffect(() => {
		const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

		if (!lastItem) return;

		if (
			lastItem.index >= allItems.length - 1 &&
			hasNextPage &&
			!isFetchingNextPage
		) {
			fetchNextPage();
		}
	}, [
		hasNextPage,
		fetchNextPage,
		allItems.length,
		isFetchingNextPage,
		virtualizer.getVirtualItems(),
	]);

	// Auto fetch previous page when scrolling to top
	// useEffect(() => {
	// 	const [firstItem] = virtualizer.getVirtualItems();

	// 	if (!firstItem) return;

	// 	if (firstItem.index <= 1 && hasPreviousPage && !isFetchingPreviousPage) {
	// 		fetchPreviousPage();
	// 	}
	// }, [
	// 	hasPreviousPage,
	// 	fetchPreviousPage,
	// 	isFetchingPreviousPage,
	// 	virtualizer.getVirtualItems(),
	// ]);

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
					shouldFilter={false}
				>
					{!isCloseSearch && (
						<CommandInput
							placeholder={`${tCommon("search")}...`}
							className={"h-9"}
							ref={refInput}
							onValueChange={onValueChange}
						/>
					)}
					<CommandList className="min-w-40" ref={setParentRef}>
						<CommandEmpty>
							{loading ? (
								<div className="flex items-center justify-center gap-2">
									<Loader className="animate-spin" size={16} />
									{`${tCommon("searching")}...`}
								</div>
							) : (
								<div className="flex items-center justify-center gap-2">
									{tCommon("no-data")}
								</div>
							)}
						</CommandEmpty>
						<CommandGroup>
							<div
								style={{
									height: `${virtualizer.getTotalSize()}px`,
									width: "100%",
									position: "relative",
								}}
							>
								{/* Virtual items */}
								{virtualizer.getVirtualItems().map((virtualRow) => {
									const item = allItems[virtualRow.index];
									const isLastItem =
										virtualRow.index + 1 === allItems.length + 1;

									// Handle loading rows
									const isSelected = !!item?.id && item?.id === value;
									const showText = isShowLabel
										? item?.label || item?.name
										: item?.name;

									return (
										<Fragment key={virtualRow.index}>
											<CommandItem
												className={cn("absolute top-0 left-0 w-full", {
													"hover:bg-transparent": isLastItem,
												})}
												style={{
													height: `${virtualRow.size}px`,
													transform: `translateY(${virtualRow.start}px)`,
												}}
												disabled={item?.disabled}
												onSelect={() => {
													if (closeOnSelect) {
														setOpen(false);
													}

													if (allowClear) {
														onChange(
															(`${value}` !== `${item?.id}`
																? item
																: null) as Option & null,
														);
													} else {
														onChange({
															...item,
															id: item?.id,
														});
													}
												}}
												data-item-selected={isSelected}
											>
												{isLastItem && (hasNextPage || isFetchingNextPage) ? (
													<div className="flex items-center w-full">
														<Skeleton
															className="w-full"
															style={{
																height: 24,
															}}
														/>
													</div>
												) : (
													<Fragment>
														{showText}
														{isShowCheckIcon && (
															<Check
																className={cn(
																	"ml-auto",
																	isSelected ? "opacity-100" : "opacity-0",
																)}
															/>
														)}
													</Fragment>
												)}
											</CommandItem>
										</Fragment>
									);
								})}
							</div>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
