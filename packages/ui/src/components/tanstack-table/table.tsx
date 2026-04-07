import { Table as TableUI } from "@repo/ui/components/table";
import { ColumnWidthContext } from "@repo/ui/components/tanstack-table/column-width-context";

import type { ColumnCustom } from "@repo/ui/types/common";
import type { Table } from "@tanstack/react-table";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TableBody } from "./table-body";
import { TableHeader } from "./table-header";

type Props<T, V> = {
	table: Table<T>;
	columns: ColumnCustom<T, V>[];
	loading?: boolean;
	max_height?: number | string;
	onRowClick?: (row: T) => void;
	onRowDoubleClick?: (row: T) => void;
};

const DEFAULT_MAX_HEIGHT = "calc(100vh - 350px)";
const SCROLL_SHADOW_EPSILON = 0.6;

const TanstackTable = <T, V>({
	table,
	columns,
	loading = false,
	max_height = DEFAULT_MAX_HEIGHT,
	onRowClick,
	onRowDoubleClick,
}: Props<T, V>) => {
	const cellRefs = useRef<(HTMLTableCellElement | null)[]>([]);
	const [widthsCol, setWidthsCol] = useState<number[]>([]);

	const containerRef = useRef<HTMLDivElement>(null);
	const [showRightShadow, setShowRightShadow] = useState(false);
	const [showLeftShadow, setShowLeftShadow] = useState(false);

	const registerCell = (colIdx: number, el: HTMLTableCellElement | null) => {
		cellRefs.current[colIdx] = el;
	};

	// Tính toán offsets với useMemo để tối ưu performance
	const { leftOffsets, rightOffsets } = useMemo(() => {
		if (widthsCol.length === 0) {
			return { leftOffsets: [], rightOffsets: [] };
		}

		const headersIndex = table
			.getHeaderGroups()[0]
			.headers.map((header, idx) => ({
				...header,
				index: idx,
			}));

		const pinnedLeftHeaders = headersIndex.filter(
			(header) => (header.column.columnDef.meta as any)?.pinnedLeft,
		);

		const pinnedRightHeaders = headersIndex.filter(
			(header) => (header.column.columnDef.meta as any)?.pinnedRight,
		);

		// Tính offset cho pinned left
		const leftOffsets: number[] = [];
		let leftOffset = 0;

		pinnedLeftHeaders.forEach((header, idx) => {
			const index = header.index;
			leftOffsets[index] = leftOffset;
			leftOffset += widthsCol[index] || 0;
		});

		// Tính offset cho pinned right (duyệt ngược)
		const rightOffsets: number[] = [];
		let rightOffset = 0;

		[...pinnedRightHeaders].reverse().forEach((header, idx) => {
			const index = header.index;
			rightOffsets[index] = rightOffset;
			rightOffset += widthsCol[index] || 0;
		});
		return { leftOffsets, rightOffsets };
	}, [widthsCol, table, table.getHeaderGroups()]);

	useEffect(() => {
		if (!loading) {
			const newWidthsCol = cellRefs.current.map(
				(cell) => cell?.getBoundingClientRect().width ?? 0,
			);
			setWidthsCol(newWidthsCol);
		}
	}, [columns, loading, table.getRowModel().rows.length]);

	//======scroll======
	useEffect(() => {
		const el = containerRef?.current;
		if (!el) return;

		const handleScroll = () => {
			setShowLeftShadow(el.scrollLeft > 0);
			setShowRightShadow(
				el.scrollLeft + el.clientWidth < el.scrollWidth - SCROLL_SHADOW_EPSILON,
			);
		};

		const resizeObserver = new ResizeObserver(handleScroll);
		resizeObserver.observe(el);

		handleScroll();
		el.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleScroll);
		return () => {
			resizeObserver.disconnect();
			el.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	return (
		<ColumnWidthContext.Provider
			value={{
				registerCell: (colIdx, el) => registerCell(colIdx, el),
				widthsCol,
				leftOffsets,
				rightOffsets,
			}}
		>
			<TableUI
				className="relative"
				max_height={max_height}
				containerRef={containerRef}
			>
				<TableHeader
					table={table}
					showRightShadow={showRightShadow}
					showLeftShadow={showLeftShadow}
				/>
				<TableBody
					table={table}
					columns={columns}
					loading={loading}
					showRightShadow={showRightShadow}
					showLeftShadow={showLeftShadow}
					onRowClick={onRowClick}
					onRowDoubleClick={onRowDoubleClick}
				/>
			</TableUI>
		</ColumnWidthContext.Provider>
	);
};

export { TanstackTable };
