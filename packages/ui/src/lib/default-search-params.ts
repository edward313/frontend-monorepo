import type { BaseFilter } from "@repo/ui/types/common";
import { parseAsInteger, parseAsString } from "nuqs";

export const defaultSearchParams = {
	page: parseAsInteger.withDefault(1),
	limit: parseAsInteger.withDefault(10),
	search: parseAsString.withDefault(""),
	sort_by: parseAsString.withDefault(""),
	order_by: parseAsString.withDefault("asc"),
};

type SetSearchParams = (next: Partial<BaseFilter<any>>) => void;

export const onGlobalFilterChange =
	(setSearchParams: SetSearchParams) => (updater: any) => {
		const newValue =
			typeof updater === "function" ? updater("") : (updater as string);

		setSearchParams({
			page: 1,
			search: newValue ?? "",
		});
	};

export const onSortingChange =
	(setSearchParams: SetSearchParams) => (updater: any) => {
		const newValue =
			typeof updater === "function"
				? updater([{ id: "", desc: false }])
				: updater;

		setSearchParams({
			page: 1,
			sort_by: newValue[0].id,
			order_by: newValue[0].desc ? "desc" : "asc",
		});
	};

export const onPaginationChange =
	(setSearchParams: SetSearchParams) => (updater: any) => {
		const newValue =
			typeof updater === "function"
				? updater({ pageIndex: 0, pageSize: 10 })
				: updater;

		setSearchParams({
			page: newValue.pageIndex + 1,
			limit: newValue.pageSize,
		});
	};
