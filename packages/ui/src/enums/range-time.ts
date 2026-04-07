import {
	endOfDay,
	endOfMonth,
	endOfWeek,
	startOfDay,
	startOfMonth,
	startOfWeek,
	subDays,
	subMonths,
	subWeeks,
} from "date-fns";

const now = new Date();

export enum StatusDatePreset {
	TODAY = "today",
	YESTERDAY = "yesterday",
	THIS_WEEK = "this_week",
	LAST_WEEK = "last_week",
	THIS_MONTH = "this_month",
	LAST_MONTH = "last_month",
}
export const StatusDatePresetLabel: Record<StatusDatePreset, string> = {
	[StatusDatePreset.TODAY]: "Hôm nay",
	[StatusDatePreset.YESTERDAY]: "Hôm qua",
	[StatusDatePreset.THIS_WEEK]: "Tuần này",
	[StatusDatePreset.LAST_WEEK]: "Tuần trước",
	[StatusDatePreset.THIS_MONTH]: "Tháng này",
	[StatusDatePreset.LAST_MONTH]: "Tháng trước",
};
export interface DatePresetItem {
	statusDatePreset: StatusDatePreset;
	from: Date;
	to: Date;
	name?: string;
}
export const DATE_PRESETS: DatePresetItem[] = [
	{
		statusDatePreset: StatusDatePreset.TODAY,
		name: StatusDatePresetLabel[StatusDatePreset.TODAY],
		from: startOfDay(now),
		to: endOfDay(now),
	},
	{
		statusDatePreset: StatusDatePreset.YESTERDAY,
		name: StatusDatePresetLabel[StatusDatePreset.YESTERDAY],
		from: startOfDay(subDays(now, 1)),
		to: endOfDay(subDays(now, 1)),
	},
	{
		statusDatePreset: StatusDatePreset.THIS_WEEK,
		name: StatusDatePresetLabel[StatusDatePreset.THIS_WEEK],
		from: startOfWeek(now, { weekStartsOn: 1 }),
		to: endOfDay(now),
	},
	{
		statusDatePreset: StatusDatePreset.LAST_WEEK,
		name: StatusDatePresetLabel[StatusDatePreset.LAST_WEEK],
		from: startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 }),
		to: endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 }),
	},
	{
		statusDatePreset: StatusDatePreset.THIS_MONTH,
		name: StatusDatePresetLabel[StatusDatePreset.THIS_MONTH],
		from: startOfMonth(now),
		to: endOfDay(now),
	},
	{
		statusDatePreset: StatusDatePreset.LAST_MONTH,
		name: StatusDatePresetLabel[StatusDatePreset.LAST_MONTH],
		from: startOfMonth(subMonths(now, 1)),
		to: endOfMonth(subMonths(now, 1)),
	},
];
