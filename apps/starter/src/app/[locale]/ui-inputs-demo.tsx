"use client";

import { Checkbox } from "@repo/ui/components/checkbox";
import { Combobox } from "@repo/ui/components/combobox";
import { ComboboxLoadMore } from "@repo/ui/components/combobox-loadmore";
import DatePicker from "@repo/ui/components/date-picker";
import DateRangePicker from "@repo/ui/components/date-range-picker";
import { Input } from "@repo/ui/components/input";
import InputNumber from "@repo/ui/components/input-number";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@repo/ui/components/input-otp";
import MultiCheckbox from "@repo/ui/components/multi-checkbox";
import MultiCombobox from "@repo/ui/components/multi-combobox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/components/select";
import { Switch } from "@repo/ui/components/switch";
import { Textarea } from "@repo/ui/components/textarea";
import type { Option } from "@repo/ui/types/common";
import * as React from "react";

const options: Option[] = [
	{ id: 1, name: "Alpha" },
	{ id: 2, name: "Beta" },
	{ id: 3, name: "Gamma" },
	{ id: 4, name: "Delta" },
];

const currencyOptions = [
	{ value: "vnd", label: "VND" },
	{ value: "usd", label: "USD" },
	{ value: "eur", label: "EUR" },
];
const otpGroupA = [0, 1, 2];
const otpGroupB = [3, 4, 5];

export default function UiInputsDemo() {
	const [textValue, setTextValue] = React.useState("hello");
	const [searchValue, setSearchValue] = React.useState("");
	const [textareaValue, setTextareaValue] = React.useState("Line 1\nLine 2");
	const [numberValue, setNumberValue] = React.useState<number | string>(12345);
	const [otpValue, setOtpValue] = React.useState("");
	const [selectValue, setSelectValue] = React.useState("alpha");
	const [comboValue, setComboValue] = React.useState<Option["id"]>(1);
	const [comboLoadValue, setComboLoadValue] = React.useState<Option["id"]>(2);
	const [multiComboValue, setMultiComboValue] = React.useState<Option["id"][]>([
		1, 3,
	]);
	const [multiCheckboxValue, setMultiCheckboxValue] = React.useState<
		(string | number)[]
	>([2]);
	const [checkboxChecked, setCheckboxChecked] = React.useState(false);
	const [switchChecked, setSwitchChecked] = React.useState(true);
	const [dateValue, setDateValue] = React.useState<Date | string | undefined>(
		undefined,
	);
	const [dateRangeValue, setDateRangeValue] = React.useState<{
		from?: Date;
		to?: Date;
		status_date_preset: string;
	}>({
		from: undefined,
		to: undefined,
		status_date_preset: "",
	});
	const [currencyValue, setCurrencyValue] = React.useState("vnd");

	const handleMultiComboboxChange = (selected: Option[]) => {
		setMultiComboValue(selected.map((item) => item.id));
	};
	React.useEffect(() => {
		const now = new Date();
		setDateValue(now);
		setDateRangeValue({
			from: now,
			to: now,
			status_date_preset: "",
		});
	}, []);

	return (
		<section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Input</h3>
				<Input
					value={textValue}
					onChange={setTextValue}
					placeholder="Type something"
					allowClear
				/>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Input With Suffix Select</h3>
				<Input
					value={searchValue}
					onChange={setSearchValue}
					placeholder="Amount"
					allowClear
					isShowSelect
					options={currencyOptions}
					selectValue={currencyValue}
					onChangeSelect={setCurrencyValue}
				/>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Textarea</h3>
				<Textarea
					value={textareaValue}
					onChange={(event) => setTextareaValue(event.target.value)}
					placeholder="Write something"
				/>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Input Number</h3>
				<InputNumber
					value={Number(numberValue) || 0}
					onValueChange={(nextValue) => setNumberValue(nextValue ?? "")}
					placeholder="0"
					isShowSelect
					options={currencyOptions}
					selectValue={currencyValue}
					onChangeSelect={setCurrencyValue}
				/>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">OTP Input</h3>
				<InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
					<InputOTPGroup>
						{otpGroupA.map((slot) => (
							<InputOTPSlot key={slot} index={slot} />
						))}
						{otpGroupB.map((slot) => (
							<InputOTPSlot key={slot} index={slot} />
						))}
					</InputOTPGroup>
				</InputOTP>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Select</h3>
				<Select value={selectValue} onValueChange={setSelectValue}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Pick one" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="alpha">Alpha</SelectItem>
						<SelectItem value="beta">Beta</SelectItem>
						<SelectItem value="gamma">Gamma</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Combobox</h3>
				<Combobox
					value={comboValue}
					options={options}
					allowClear
					onChange={(option) => setComboValue(option ? option.id : 0)}
					placeholder="Choose option"
				/>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Combobox Load More</h3>
				<ComboboxLoadMore
					value={comboLoadValue}
					options={options}
					allowClear
					onChange={(option) => setComboLoadValue(option ? option.id : 0)}
					placeholder="Load more"
					fetchNextPage={async () => Promise.resolve({} as any)}
					fetchPreviousPage={async () => Promise.resolve({} as any)}
					hasNextPage={false}
					hasPreviousPage={false}
					isFetchingNextPage={false}
					isFetchingPreviousPage={false}
				/>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Multi Combobox</h3>
				<MultiCombobox
					value={multiComboValue}
					onChange={handleMultiComboboxChange}
					options={options}
					placeholder="Select multiple"
				/>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Multi Checkbox</h3>
				<MultiCheckbox
					value={multiCheckboxValue}
					onChange={setMultiCheckboxValue}
					options={options}
					isSomeSelected={true}
				/>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Checkbox + Switch</h3>
				<div className="flex items-center gap-4">
					<label
						className="flex items-center gap-2 text-sm"
						htmlFor="demo-checkbox-enable"
					>
						<Checkbox
							id="demo-checkbox-enable"
							checked={checkboxChecked}
							onCheckedChange={(value) => setCheckboxChecked(value === true)}
							isSomeSelected={true}
							isRoot
						/>
						Enable
					</label>
					<label
						className="flex items-center gap-2 text-sm"
						htmlFor="demo-switch-live"
					>
						<Switch
							id="demo-switch-live"
							checked={switchChecked}
							onCheckedChange={setSwitchChecked}
						/>
						Live
					</label>
				</div>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Date Picker</h3>
				<DatePicker
					value={dateValue}
					onChange={setDateValue}
					showTime
					className="w-full"
				/>
			</div>

			<div className="rounded-lg border p-4 space-y-3">
				<h3 className="text-sm font-medium">Date Range Picker</h3>
				<DateRangePicker
					value={dateRangeValue}
					onChange={(range, preset) =>
						setDateRangeValue({
							from: range?.from,
							to: range?.to,
							status_date_preset: preset || "",
						})
					}
					className="w-full"
				/>
			</div>
		</section>
	);
}
