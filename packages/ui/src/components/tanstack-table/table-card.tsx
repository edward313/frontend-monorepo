import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
} from "@repo/ui/components/card";

import { TanstackTable } from "@repo/ui/components/tanstack-table/table";
import { VisibilityColumns } from "@repo/ui/components/tanstack-table/visibility-columns";
import type { BaseFilter, ColumnCustom } from "@repo/ui/types/common";
import { cn } from "@repo/ui/utils/cn";
import type { Table } from "@tanstack/react-table";

import type React from "react";
import { GlobalSearch } from "./global-search";
import { Pagination } from "./pagination";

type Props<T, V> = {
	table: Table<T>;
	has_next?: boolean;
	has_prev?: boolean;
	total_items?: number;
	from?: number;
	to?: number;
	extra?: React.ReactNode;
	title?: React.ReactNode;
	classNameTitle?: string;
	heading?: React.ReactNode;
	isHiddenGlobalSearch?: boolean;
	isHiddenVisibilityColumn?: boolean;
	columns: ColumnCustom<T, V>[];
	loading?: boolean;
	searchParams: BaseFilter<any>;
	onRowClick?: (row: T) => void;
	onRowDoubleClick?: (row: T) => void;
	isHiddenPagination?: boolean;
};

const TableCard = <T, V>({
	table,
	has_next = false,
	has_prev = false,
	total_items = 0,
	from = 0,
	to = 0,
	extra,
	title,
	classNameTitle,
	heading,
	isHiddenGlobalSearch,
	isHiddenVisibilityColumn,
	isHiddenPagination,
	columns,
	loading,
	searchParams,
	onRowClick,
	onRowDoubleClick,
}: Props<T, V>) => {
	return (
		<Card>
			<CardHeader className="flex flex-col gap-2 w-full">
				{heading}
				<div className="flex items-center flex-wrap gap-2 w-full">
					<div
						className={cn(
							"flex-1 w-full sm:w-auto grid lg:grid-cols-2 xl:grid-cols-4 gap-2",
							classNameTitle,
						)}
					>
						{!isHiddenGlobalSearch && (
							<GlobalSearch
								defaultValue={searchParams?.search}
								onChangeCallBack={(value) => table.setGlobalFilter(value)}
							/>
						)}
						{title}
					</div>
					<CardAction className="flex items-center gap-2">
						{extra}
						{!isHiddenVisibilityColumn && <VisibilityColumns table={table} />}
					</CardAction>
				</div>
			</CardHeader>
			<CardContent>
				<TanstackTable
					table={table}
					columns={columns}
					loading={loading}
					onRowClick={onRowClick}
					onRowDoubleClick={onRowDoubleClick}
				/>
			</CardContent>
			{!isHiddenPagination && (
				<CardFooter>
					<Pagination
						table={table}
						limit={searchParams.limit}
						has_next={has_next}
						has_prev={has_prev}
						from={from}
						to={to}
						total={total_items}
					/>
				</CardFooter>
			)}
		</Card>
	);
};

export { TableCard };
