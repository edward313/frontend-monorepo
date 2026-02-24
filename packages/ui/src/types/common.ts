import type {
	UseMutationOptions,
	UseQueryOptions,
} from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import type { VariantProps } from "class-variance-authority";
import type React from "react";
import type { badgeVariants } from "@repo/ui/components/badge";

export type ObjectResponse<T> = {
	status: number;
	message: string;
	error: boolean;
	data: T;
};

export type ListResponse<T> = {
	status: number;
	message: string;
	error: boolean;
	current_page: number;
	last_page: number;
	has_next: boolean;
	has_prev: boolean;
	per_page: number;
	from_: number;
	to: number;
	total: number;
	data: T[];
};

export type ErrorResponse = { error: boolean; message: string; status: number };

export type BaseFilter<T = object> = {
	page: number;
	limit: number;
	search: string;
	sort_by: string;
	order_by: "asc" | "desc";
} & T;

export type StatusDisplay = {
	id: string | number;
	label: string;
	variant: VariantProps<typeof badgeVariants>["variant"];
	icon?: React.ReactNode;
	toString: () => string;
};

export type Option = {
	name: string;
	id: string | number;
	disabled?: boolean;
	label?: React.ReactNode;
	[key: string]: any;
};

export type OptionAddressGoong = {
	id: string | number;
	address_components: {
		long_name: string;
		short_name: string;
	}[];
	formatted_address: string; // dùng cái này để hiện detail_address
	geometry: {
		location: {
			lat: number;
			lng: number;
		};
		boundary: any;
	};
	place_id: string;
	reference: string;
	plus_code: {
		compound_code: string;
		global_code: string;
	};
	compound: {
		commune: string;
		province: string;
	};
	types: string[];
	name: string;
	address: string;
	deprecated_description: string;
	deprecated_compound: {
		district: string;
		commune: string;
		province: string;
	};
};

export type FormatDateType =
	| "yyyy-MM-dd"
	| "dd-MM-yyyy"
	| "MM-dd-yyyy"
	| "yyyy/MM/dd"
	| "dd/MM/yyyy"
	| "yyyy-MM-dd HH:mm"
	| "dd-MM-yyyy HH:mm"
	| "MM-dd-yyyy HH:mm"
	| "yyyy/MM/dd HH:mm"
	| "dd/MM/yyyy HH:mm"
	| "yyyy-MM-dd HH:mm:ss"
	| "dd-MM-yyyy HH:mm:ss"
	| "MM-dd-yyyy HH:mm:ss"
	| "yyyy/MM/dd HH:mm:ss"
	| "dd/MM/yyyy HH:mm:ss"
	| "HH:mm";
export enum DateRange {
  TODAY = "today",
  YESTERDAY = "yesterday",
  THIS_WEEK = "this_week",
  LAST_WEEK = "last_week",
  THIS_MONTH = "this_month",
  LAST_MONTH = "last_month",
}
export type QueryOptions<T> = Omit<
	UseQueryOptions<any, Error, T, any>,
	"queryKey" | "queryFn"
>;

export type MutationOptions<T> = Omit<
	UseMutationOptions<any, Error, T, any>,
	"mutationFn"
>;

export type DateRangeType<T = Date> = {
	from: T | undefined;
	to?: T | undefined;
};

export type DateRangeCustom = {
	from?: string | Date | null;
	to?: string | Date | null;
};

export type ColumnCustom<T, TValue = any> = ColumnDef<T, TValue> & {
	meta?: {
		pinnedLeft?: boolean;
		pinnedRight?: boolean;
		cellClassName?: string;
		defaultHidden?: boolean;
		align?: "left" | "center" | "right";
	};
};
