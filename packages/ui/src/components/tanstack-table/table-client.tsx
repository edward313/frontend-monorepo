"use client";

import type { BaseFilter, ColumnCustom } from "@repo/ui/types/common";
import {
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { memo, useState } from "react";
import { TableCard } from "./table-card";

interface TableClientProps<TData, TValue> {
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
	heading?: React.ReactNode;
	extra?: React.ReactNode;
	title?: React.ReactNode;
	isHiddenGlobalSearch?: boolean;
	isHiddenVisibilityColumn?: boolean;
	onSetSearchParams: (params: BaseFilter<{}>) => void;
	searchParams: BaseFilter<any>;
	isHiddenPagination?: boolean;
}

//memo
export const TableClient = memo(
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
		heading,
		extra,
		title,
		isHiddenGlobalSearch = false,
		isHiddenVisibilityColumn = false,
		onSetSearchParams,
		searchParams,
		isHiddenPagination = false,
	}: TableClientProps<TData, TValue>) => {
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
			onGlobalFilterChange: (updater) => {
				const newValue =
					typeof updater === "function"
						? updater(searchParams.search)
						: updater;

				onSetSearchParams({
					...searchParams,
					page: 1,
					search: newValue,
				});
			},
			onSortingChange: (updater) => {
				const newValue =
					typeof updater === "function"
						? updater([
								{
									id: searchParams.sort_by,
									desc: searchParams.order_by === "desc",
								},
							])
						: updater;

				onSetSearchParams({
					...searchParams,
					page: 1,
					sort_by: newValue[0].id,
					order_by: newValue[0].desc ? "desc" : "asc",
				});
			},
			onPaginationChange: (updater) => {
				const newValue =
					typeof updater === "function"
						? updater({
								pageIndex: searchParams.page - 1,
								pageSize: searchParams.limit,
							})
						: updater;

				onSetSearchParams({
					...searchParams,
					page: newValue.pageIndex + 1,
					limit: newValue.pageSize,
				});
			},
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
				heading={heading}
				extra={extra}
				title={title}
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
	props: TableClientProps<TData, TValue>,
) => React.JSX.Element;
