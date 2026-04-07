"use client";

import {
	defaultSearchParams,
	onGlobalFilterChange,
	onPaginationChange,
	onSortingChange,
} from "@repo/ui/lib/default-search-params";
import type { ColumnCustom } from "@repo/ui/types/common";
import {
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useQueryStates } from "nuqs";
import { memo, useState } from "react";
import { TableCard } from "./table-card";

interface TableServerProps<TData, TValue> {
	columns: ColumnCustom<TData, TValue>[];
	data: TData[];
	loading?: boolean;
	has_next?: boolean;
	has_prev?: boolean;
	total_items?: number;
	from?: number;
	to?: number;
	onRowClick?: (row: TData) => void;
	onRowDoubleClick?: (row: TData) => void;
	extra?: React.ReactNode;
	title?: React.ReactNode;
	classNameTitle?: string;
	isHiddenGlobalSearch?: boolean;
	isHiddenVisibilityColumn?: boolean;
	isHiddenPagination?: boolean;
}

//memo
export const TableServer = memo(
	<TData, TValue>({
		columns,
		data,
		loading = false,
		has_next = false,
		has_prev = false,
		total_items = 0,
		from = 0,
		to = 0,
		onRowClick,
		onRowDoubleClick,
		extra,
		title,
		classNameTitle,
		isHiddenGlobalSearch = false,
		isHiddenVisibilityColumn = false,
		isHiddenPagination = false,
	}: TableServerProps<TData, TValue>) => {
		const [searchParams, setSearchParams] = useQueryStates(defaultSearchParams);
		const defaultHiddenColumns = columns
			.filter(
				(
					col,
				): col is ColumnCustom<TData, TValue> & {
					accessorKey: string | number;
				} => "accessorKey" in col && col.accessorKey !== undefined,
			)
			.filter((col) => (col.meta as any)?.defaultHidden)
			.map((col) => [String(col.accessorKey), false]);
		const [columnVisibility, setColumnVisibility] = useState(() =>
			Object.fromEntries(defaultHiddenColumns),
		);
		const table = useReactTable({
			data,
			columns,
			rowCount: total_items || 0,
			onGlobalFilterChange: onGlobalFilterChange(setSearchParams),
			onSortingChange: onSortingChange(setSearchParams),
			onPaginationChange: onPaginationChange(setSearchParams),
			onColumnVisibilityChange: setColumnVisibility,
			getCoreRowModel: getCoreRowModel(),
			getFilteredRowModel: getFilteredRowModel(),
			manualSorting: true,
			manualPagination: true,
			manualFiltering: true,
			state: {
				globalFilter: searchParams.search,
				sorting: [
					{ id: searchParams.sort_by, desc: searchParams.order_by === "desc" },
				],
				pagination: {
					pageIndex: searchParams.page - 1,
					pageSize: searchParams.limit,
				},
				columnVisibility,
			},
		});

		return (
			<TableCard
				table={table}
				has_next={has_next}
				has_prev={has_prev}
				total_items={total_items}
				from={from}
				to={to}
				extra={extra}
				title={title}
				classNameTitle={classNameTitle}
				isHiddenGlobalSearch={isHiddenGlobalSearch}
				isHiddenVisibilityColumn={isHiddenVisibilityColumn}
				isHiddenPagination={isHiddenPagination}
				columns={columns}
				loading={loading}
				searchParams={searchParams}
				onRowClick={onRowClick}
				onRowDoubleClick={onRowDoubleClick}
			/>
		);
	},
) as <TData, TValue>(
	props: TableServerProps<TData, TValue>,
) => React.JSX.Element;
