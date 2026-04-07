import { ArrowDown } from "@phosphor-icons/react";
import {
	TableHead,
	TableHeader as TableHeaderUI,
	TableRow,
} from "@repo/ui/components/table";
import { useColumnWidthContext } from "@repo/ui/components/tanstack-table/column-width-context";
import { cn } from "@repo/ui/utils/cn";
import { flexRender, type Table } from "@tanstack/react-table";

type Props<T> = {
	table: Table<T>;
	showRightShadow?: boolean;
	showLeftShadow?: boolean;
};

const TableHeader = <T,>({
	table,
	showRightShadow = false,
	showLeftShadow = false,
}: Props<T>) => {
	const { registerCell, leftOffsets, rightOffsets } = useColumnWidthContext();
	const indexFirstPinnedLeft = leftOffsets.findLastIndex(
		(offset) => offset != null,
	);
	const indexFirstPinnedRight = rightOffsets.findIndex(
		(offset) => offset != null,
	);

	return (
		<TableHeaderUI className="sticky top-0 bg-white z-40">
			{table.getHeaderGroups().map((headerGroup) => {
				return (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header, idx) => {
							const isPinnedLeft = (header.column.columnDef.meta as any)
								?.pinnedLeft;
							const isPinnedRight = (header.column.columnDef.meta as any)
								?.pinnedRight;

							return (
								<TableHead
									key={header.id}
									ref={(el) => registerCell(idx, el)}
									onClick={
										header.column.getCanSort()
											? () =>
													header.column.toggleSorting(
														header.column.getIsSorted() === "asc",
													)
											: undefined
									}
									className={cn({
										...(header.column.columnDef.meta as any)?.cellClassName,
										"sticky z-30": isPinnedLeft || isPinnedRight,
										"shadow-right-indicator":
											showLeftShadow && idx === indexFirstPinnedLeft,
										"shadow-left-indicator":
											showRightShadow && idx === indexFirstPinnedRight,
									})}
									style={
										isPinnedLeft
											? { left: leftOffsets[idx] }
											: isPinnedRight
												? { right: rightOffsets[idx] }
												: undefined
									}
								>
									<div className="flex items-center gap-2">
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}

										{header.column.getCanSort() && (
											<ArrowDown
												className={cn(
													"transition-all duration-300 group-hover:opacity-100",
													header.column.getIsSorted()
														? "opacity-100"
														: "opacity-0",
													header.column.getIsSorted() === "asc"
														? "rotate-180"
														: "rotate-0",
												)}
											/>
										)}
									</div>
								</TableHead>
							);
						})}
					</TableRow>
				);
			})}
		</TableHeaderUI>
	);
};

export { TableHeader };
