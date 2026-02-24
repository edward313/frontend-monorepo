import { Button } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import { FormControl } from "@repo/ui/components/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@repo/ui/components/popover";
import {
	DATE_PRESETS,
	StatusDatePreset,
	StatusDatePresetLabel,
} from "@repo/ui/enums/range-time";
import { cn } from "@repo/ui/utils/cn";
import type { DateRangeType, FormatDateType } from "@repo/ui/types/common";
import { CalendarDots } from "@phosphor-icons/react";
import type { PopoverProps } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import type { DateRange, Matcher } from "react-day-picker";

export type DateRangePickerProps<T> = {
	trigger?: React.ReactNode;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
	value: {
		from?: any;
		to?: any;
		status_date_preset?: any;
	};
	placeholder?: string;
	onChange: (
		dateRange: DateRangeType<T> | undefined,
		datePreset?: string | undefined,
	) => void;
	isForm?: boolean;
	disabledDate?: Matcher | Matcher[];
	formatDate?: FormatDateType;
	endMonth?: Date;
} & PopoverProps;

const DateRangePicker = <T extends Date | string = Date>({
	trigger,
	disabled,
	className,
	loading = false,
	value,
	placeholder,
	onChange,
	isForm = false,
	disabledDate,
	formatDate = "dd/MM/yyyy",
	endMonth = new Date(),
	...props
}: DateRangePickerProps<T>) => {
	const [range, setRange] = useState<DateRange>({
		from: value.from,
		to: value.to,
	});
	const [step, setStep] = useState<"from" | "to">("from");
	const [open, setOpen] = useState(false);
	const [month, setMonth] = useState(value.from || new Date());
	const [datePreset, setDatePreset] = useState<string | undefined>(
		value?.status_date_preset,
	);

	const from = range?.from
		? new Date(new Date(range?.from).setHours(0, 0, 0))
		: undefined;
	const to = range?.to
		? new Date(new Date(range?.to).setHours(0, 0, 0))
		: undefined;
	function handlePreset(dateRange: DateRange, datePreset?: string) {
		setRange({ from: dateRange?.from, to: dateRange?.to });

		setDatePreset(datePreset);
		setMonth(dateRange?.from);
		onChange(
			{
				from: dateRange?.from as T | undefined,
				to: dateRange?.to as T | undefined,
			},
			datePreset,
		);
		setStep("from");
	}
	function handleSelect(dateRange: DateRange | undefined) {
		setDatePreset("");
		if (!dateRange) {
			return;
		}

		const valueFrom = from ? new Date(format(from, "yyyy/MM/dd")) : undefined;
		const valueTo = to ? new Date(format(to, "yyyy/MM/dd")) : undefined;
		const dateRangeFrom = dateRange.from
			? new Date(format(dateRange.from, "yyyy/MM/dd"))
			: undefined;
		const dateRangeTo = dateRange.to
			? new Date(format(dateRange.to, "yyyy/MM/dd"))
			: undefined;

		if (step === "from") {
			let from = dateRange?.from;

			if (
				!!valueFrom &&
				!!dateRangeFrom &&
				valueFrom?.getTime() !== dateRangeFrom?.getTime()
			) {
				from = dateRangeFrom;
			}

			if (
				!!valueTo &&
				!!dateRangeTo &&
				valueTo?.getTime() !== dateRangeTo?.getTime()
			) {
				from = dateRangeTo;
			}
			setDatePreset("");

			setRange({ from: from, to: undefined });
			setStep("to");
		} else if (step === "to") {
			if (
				!!dateRangeFrom &&
				!!dateRangeTo &&
				dateRangeTo?.getTime() >= dateRangeFrom?.getTime()
			) {
				// hợp lệ => set to
				setRange({ from: dateRangeFrom, to: dateRangeTo });
				setDatePreset("");
				onChange(
					{
						from: dateRangeFrom as T | undefined,
						to: dateRangeTo as T | undefined,
					},
					"",
				);
			} else {
				// chọn sai (bé hơn from) => coi như bắt đầu lại
				console.log("sai");
				setRange({ from: dateRangeTo, to: undefined });
				setDatePreset("");
				setStep("to");
				return;
			}

			setStep("from");
		}
	}

	useEffect(() => {
		if (
			(range?.from && range?.to) ||
			(!range?.from && !range?.to) ||
			(range?.from && range?.to && datePreset)
		) {
			setStep("from");
		}
	}, [range, datePreset]);

	useEffect(() => {
		setMonth(value.from || new Date());
		setRange({
			from: value.from,
			to: value.to,
		});
		setDatePreset(value?.status_date_preset);
	}, [value?.from, value?.to, value?.status_date_preset]);

	const renderButtonTrigger = (trigger: React.ReactNode, isForm: boolean) => {
		const buttonTrigger = (
			<Button
				variant={"outline"}
				disabled={disabled || loading}
				className={cn(
					"w-full pl-3 text-left font-normal",
					!value && "text-muted-foreground",
					"min-w-52",
				)}
			>
				{value?.status_date_preset ? (
					<span>
						{
							StatusDatePresetLabel[
								value.status_date_preset as StatusDatePreset
							]
						}
					</span>
				) : value?.from && value?.to ? (
					<div className="flex items-center gap-2">
						{format(value.from, formatDate)}
						<span aria-hidden="true" className="text-muted-foreground/70">
							-
						</span>
						{format(value.to, formatDate)}
					</div>
				) : (
					<span>{placeholder || "Chọn ngày"}</span>
				)}

				{loading ? (
					<Loader
						size={16}
						className="ml-auto -mr-2 h-4 w-4 opacity-50 animate-spin"
					/>
				) : (
					<CalendarDots className="ml-auto -mr-2 h-4 w-4 opacity-50" />
				)}
			</Button>
		);

		if (isForm) {
			return <FormControl>{trigger ? trigger : buttonTrigger}</FormControl>;
		}
		return trigger ? trigger : buttonTrigger;
	};
	const presets = DATE_PRESETS;

	return (
		<Popover {...props} open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{renderButtonTrigger(trigger, isForm)}
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<div className="flex gap-1">
					<div className="flex flex-col p-2 border-r">
						{presets.map((preset, index) => (
							<Button
								className="w-full justify-start"
								size="sm"
								variant={
									datePreset === preset.statusDatePreset ? "default" : "ghost"
								}
								onClick={() => {
									handlePreset(
										{ from: preset.from, to: preset.to },
										preset.statusDatePreset,
									);
								}}
								key={preset?.statusDatePreset}
							>
								{preset?.name}
							</Button>
						))}
						<Button
							className="w-full justify-start"
							size="sm"
							variant={"ghost"}
							onClick={() => {
								handlePreset({ from: undefined, to: undefined }, "");
							}}
						>
							{"Xem toàn bộ"}
						</Button>
					</div>

					<Calendar
						mode="range"
						selected={range}
						onSelect={(dateRange) => {
							handleSelect(dateRange);
						}}
						month={month}
						onMonthChange={setMonth}
						startMonth={new Date(1970, 1)}
						endMonth={endMonth}
						disabled={disabledDate}
						captionLayout="dropdown"
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default DateRangePicker;
