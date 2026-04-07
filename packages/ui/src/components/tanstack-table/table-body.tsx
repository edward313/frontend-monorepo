import { useTranslations } from "@repo/i18n";
import { Skeleton } from "@repo/ui/components/skeleton";
import {
	TableBody as TableBodyUI,
	TableCell,
	TableRow,
} from "@repo/ui/components/table";
import { useColumnWidthContext } from "@repo/ui/components/tanstack-table/column-width-context";
import type { ColumnCustom } from "@repo/ui/types/common";
import { cn } from "@repo/ui/utils/cn";
import { flexRender, type Table } from "@tanstack/react-table";

const SKELETON_ROW_COUNT = 3;

type Props<T, V> = {
	table: Table<T>;
	columns: ColumnCustom<T, V>[];
	loading?: boolean;
	showRightShadow?: boolean;
	showLeftShadow?: boolean;
	onRowClick?: (row: T) => void;
	onRowDoubleClick?: (row: T) => void;
};

const TableBody = <T, V>({
	table,
	columns,
	loading,
	showRightShadow = false,
	showLeftShadow = false,
	onRowClick,
	onRowDoubleClick,
}: Props<T, V>) => {
	const tCommon = useTranslations("Common");
	const { leftOffsets, rightOffsets } = useColumnWidthContext();

	const indexFirstPinnedLeft = leftOffsets.findLastIndex(
		(offset) => offset != null,
	);
	const indexFirstPinnedRight = rightOffsets.findIndex(
		(offset) => offset != null,
	);

	if (loading) {
		return (
			<TableBodyUI>
				{Array(table.getRowModel().rows?.length || SKELETON_ROW_COUNT)
					.fill("")
					.map((_, index) => (
						<TableRow key={index.toString()} className="my-2">
							{table
								.getAllFlatColumns()
								.filter(
									(column) =>
										!(column.columnDef.meta as { defaultHidden: boolean })
											?.defaultHidden,
								)
								.map((cell) => (
									<TableCell
										key={cell.id}
										className={cn({
											...(cell.columnDef.meta as any)?.cellClassName,
											"sticky right-0": (cell.columnDef.meta as any)
												?.pinnedRight,
											"sticky left-0": (cell.columnDef.meta as any)?.pinnedLeft,
										})}
									>
										<Skeleton className="h-full w-full rounded-xl" />
									</TableCell>
								))}
						</TableRow>
					))}
			</TableBodyUI>
		);
	}

	return (
		<TableBodyUI>
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map((row, rowIdx) => {
					return (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
							className={cn("group my-2")}
							onClick={() => onRowClick?.(row.original)}
							onDoubleClick={() => onRowDoubleClick?.(row.original)}
						>
							{row.getVisibleCells().map((cell, idx) => {
								const isPinnedRight = (cell.column.columnDef.meta as any)
									?.pinnedRight;
								const isPinnedLeft = (cell.column.columnDef.meta as any)
									?.pinnedLeft;
								const className = (cell.column.columnDef.meta as any)
									?.cellClassName;

								return (
									<TableCell
										key={cell.id}
										className={cn(
											{
												"sticky z-30": isPinnedLeft || isPinnedRight,
												"bg-white": rowIdx % 2 === 0,
												"bg-gray-50": rowIdx % 2 === 1,
												"shadow-right-indicator":
													showLeftShadow && indexFirstPinnedLeft === idx,
												"shadow-left-indicator":
													showRightShadow && indexFirstPinnedRight === idx,
											},
											className,
										)}
										style={
											isPinnedLeft
												? { left: leftOffsets[idx] }
												: isPinnedRight
													? { right: rightOffsets[idx] }
													: undefined
										}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								);
							})}
						</TableRow>
					);
				})
			) : (
				<TableRow>
					<TableCell colSpan={columns.length} className="h-24 text-center">
						{tCommon("no-data")}
					</TableCell>
				</TableRow>
			)}
		</TableBodyUI>
	);
};

export { TableBody };
