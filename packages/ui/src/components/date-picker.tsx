import { CalendarDots } from "@phosphor-icons/react";
import type { PopoverProps } from "@radix-ui/react-popover";
import { Button } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import { FormControl } from "@repo/ui/components/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@repo/ui/components/popover";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";
import { Separator } from "@repo/ui/components/separator";
import { cn } from "@repo/ui/utils/cn";
import {
	format,
	formatDate,
	setHours,
	setMinutes,
	setSeconds,
	startOfDay,
} from "date-fns";
import { Loader } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import type { DayPickerProps, Matcher } from "react-day-picker";
import type {
	ControllerRenderProps,
	FieldError,
	FieldErrorsImpl,
	Merge,
} from "react-hook-form";

export type DatePickerProps = {
	trigger?: React.ReactNode;
	isForm?: boolean;
	className?: string;
	disabled?: boolean;
	loading?: boolean;
	placeholder?: string;
	typeValue?: "date" | "string";
	showTime?: boolean;
	showTimeFormat?: "HH:mm" | "HH:mm:ss";
	closeOnSelect?: boolean;
	disabledDate?: Matcher | Matcher[];
	disabledDateTime?: (date: Date) => {
		disabledHours?: (hour: number) => boolean;
		disabledMinutes?: (minute: number) => boolean;
		disabledSeconds?: (second: number) => boolean;
	};
	value: any;
	onChange: (value: Date | string) => void;
	slotPropsCalendar?: DayPickerProps;
	error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
} & PopoverProps &
	Partial<Omit<ControllerRenderProps<any, string>, "value" | "onChange">>;

const DatePicker = ({
	trigger,
	className,
	disabled,
	loading = false,
	placeholder,
	typeValue = "date",
	closeOnSelect = true,
	isForm = false,
	disabledDate = undefined,
	disabledDateTime = undefined,
	value,
	showTime = false,
	showTimeFormat = "HH:mm:ss",
	onChange,
	slotPropsCalendar,
	error,
	...props
}: DatePickerProps) => {
	const [open, setOpen] = useState(false);

	const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 giờ
	const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // 0, 5, 10, ..., 55 phút
	const seconds = Array.from({ length: 60 }, (_, i) => i); // 0, 5, 10, ..., 55 giây

	const isShowHour = showTime && showTimeFormat.includes("HH");
	const isShowMinute = showTime && showTimeFormat.includes("mm");
	const isShowSecond = showTime && showTimeFormat.includes("ss");

	useEffect(() => {
		if (error) {
			setOpen(true);
		}
	}, [error]);

	const timeValue = useMemo(() => {
		let text = "";
		if (isShowHour) {
			text += `${(value?.getHours() ?? 0).toString().padStart(2, "0")}`;
		}
		if (isShowMinute) {
			text += `:${(value?.getMinutes() ?? 0).toString().padStart(2, "0")}`;
		}
		if (isShowSecond) {
			text += `:${(value?.getSeconds() ?? 0).toString().padStart(2, "0")}`;
		}
		return text;
	}, [value, isShowHour, isShowMinute, isShowSecond]);

	const handleOnSelect = (date: Date | undefined) => {
		if (!date) {
			onChange("");
		} else {
			if (typeValue === "date") {
				onChange(date);
			} else {
				onChange(formatDate(date, "yyyy-MM-dd HH:mm:ss"));
			}
		}
	};

	const renderButtonTrigger = (trigger: React.ReactNode, isForm: boolean) => {
		const buttonTrigger = (
			<Button
				{...props}
				aria-expanded={open}
				variant={"outline"}
				disabled={disabled || loading}
				className={cn(
					"aria-invalid:text-destructive aria-invalid:bg-destructive/5",
					"w-full pl-3 text-left font-normal has-[>svg]:pl-3",
					!value && "text-muted-foreground",
				)}
			>
				{value ? (
					format(value, `dd/MM/yyyy ${showTime ? showTimeFormat : ""}`)
				) : (
					<span className="truncate">{placeholder || "Chọn ngày"}</span>
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

	const setHourDefault = (date: Date | undefined) => {
		if (!date) return date;
		let newDate = date;
		Array(24)
			.fill(0)
			.every((_, hour) => {
				if (!disabledDateTime?.(newDate)?.disabledHours?.(hour)) {
					newDate = setHours(newDate, hour);
					return false;
				}
				return true;
			});
		return newDate;
	};

	const setMinuteDefault = (date: Date | undefined) => {
		if (!date) return date;
		let newDate = date;
		Array(60)
			.fill(0)
			.every((_, minute) => {
				if (!disabledDateTime?.(newDate)?.disabledMinutes?.(minute)) {
					newDate = setMinutes(newDate, minute);
					return false;
				}
				return true;
			});
		return newDate;
	};

	const setSecondDefault = (date: Date | undefined) => {
		if (!date) return date;
		let newDate = date;
		Array(60)
			.fill(0)
			.every((_, second) => {
				if (!disabledDateTime?.(newDate)?.disabledSeconds?.(second)) {
					newDate = setSeconds(newDate, second);
					return false;
				}
				return true;
			});
		return newDate;
	};

	const handleTimeChange = (
		type: "hour" | "minute" | "second",
		valueTime: string,
	) => {
		let newDate: Date | undefined = value ? new Date(value) : new Date();
		if (type === "hour") {
			newDate = setMinuteDefault(newDate);
			newDate = setSecondDefault(newDate);
			newDate?.setHours(Number.parseInt(valueTime));
		} else if (type === "minute") {
			newDate = setSecondDefault(newDate);
			newDate?.setMinutes(Number.parseInt(valueTime));
		} else if (type === "second") {
			newDate?.setSeconds(Number.parseInt(valueTime));
		}

		handleOnSelect(newDate);
	};

	return (
		<Popover {...props} open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{renderButtonTrigger(trigger, isForm)}
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<div className="sm:flex">
					<Calendar
						{...slotPropsCalendar}
						mode="single"
						selected={value}
						defaultMonth={value}
						onSelect={(date) => {
							let newDate = setHourDefault(date);
							newDate = setMinuteDefault(newDate);
							newDate = setSecondDefault(newDate);
							handleOnSelect(newDate);

							if (closeOnSelect && !showTime) {
								setOpen(false);
							}
						}}
						startMonth={slotPropsCalendar?.startMonth || new Date(1970, 1)}
						endMonth={slotPropsCalendar?.endMonth}
						disabled={disabledDate}
						captionLayout="dropdown"
					/>
					{showTime && (
						<div className="flex flex-col gap-1 border-l-2">
							<div className="text-base font-bold text-center mt-1">
								{timeValue}
							</div>
							<Separator className="w-full" />

							<div className="flex flex-col sm:flex-row sm:h-[270px] divide-y sm:divide-y-0 sm:divide-x">
								{isShowHour && (
									<ScrollArea
										className="w-64 sm:w-auto [&>div]:mr-0"
										classNameScrollbar="mr-0"
									>
										<div className="flex sm:flex-col gap-4">
											{hours.map((hour) => {
												return (
													<Button
														key={hour}
														size="icon"
														data-slot-time
														variant={
															value && value.getHours() === hour
																? "default"
																: "ghost"
														}
														data-slot-time-selected={
															value && value.getHours() === hour
														}
														className="w-10 h-8 shrink-0 aspect-square data-slot-time:shadow-none data-slot-time:hover:bg-blue-50 data-slot-time:hover:data-[slot-time-selected=true]:bg-blue-700"
														onClick={() =>
															handleTimeChange("hour", hour.toString())
														}
														disabled={
															disabled ||
															disabledDateTime?.(
																startOfDay(value),
															)?.disabledHours?.(hour)
														}
													>
														{hour.toString().padStart(2, "0")}
													</Button>
												);
											})}
										</div>
										<ScrollBar orientation="horizontal" className="sm:hidden" />
									</ScrollArea>
								)}
								{isShowMinute && (
									<ScrollArea
										className="w-64 sm:w-auto [&>div]:mr-0"
										classNameScrollbar="mr-0"
									>
										<div className="flex sm:flex-col gap-4">
											{minutes.map((minute) => (
												<Button
													key={minute}
													size="icon"
													variant={
														value && value.getMinutes() === minute
															? "default"
															: "ghost"
													}
													className="w-10 h-8 shrink-0 aspect-square shadow-none"
													onClick={() =>
														handleTimeChange("minute", minute.toString())
													}
													disabled={
														disabled ||
														disabledDateTime?.(
															setSeconds(setMinutes(value, 0), 0),
														)?.disabledMinutes?.(minute)
													}
												>
													{minute.toString().padStart(2, "0")}
												</Button>
											))}
										</div>
										<ScrollBar orientation="horizontal" className="sm:hidden" />
									</ScrollArea>
								)}
								{isShowSecond && (
									<ScrollArea
										className="w-64 sm:w-auto [&>div]:mr-0"
										classNameScrollbar="mr-0"
									>
										<div className="flex sm:flex-col gap-4">
											{seconds.map((second) => (
												<Button
													key={second}
													size="icon"
													variant={
														value && value.getSeconds() === second
															? "default"
															: "ghost"
													}
													disabled={
														disabled ||
														disabledDateTime?.(
															setSeconds(value, 0),
														)?.disabledSeconds?.(second)
													}
													onClick={() =>
														handleTimeChange("second", second.toString())
													}
													className="w-10 h-8 shrink-0 aspect-square shadow-none"
												>
													{second.toString().padStart(2, "0")}
												</Button>
											))}
										</div>
										<ScrollBar orientation="horizontal" className="sm:hidden" />
									</ScrollArea>
								)}
							</div>
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default DatePicker;
