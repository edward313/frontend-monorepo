import {
	CaretLeft,
	CaretLineLeft,
	CaretLineRight,
	CaretRight,
} from "@phosphor-icons/react";

import { Label } from "@repo/ui/components/label";
import {
	PaginationButton,
	PaginationContent,
	PaginationItem,
	Pagination as PaginationUI,
} from "@repo/ui/components/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/components/select";
import type { Table } from "@tanstack/react-table";
import { useId } from "react";

type PaginationProps<T> = {
	limit: number;
	table: Table<T>;
	has_next: boolean;
	has_prev: boolean;
	from: number;
	to: number;
	total: number;
};

export function Pagination<T>({
	limit,
	table,
	has_next,
	has_prev,
	from,
	to,
	total,
}: PaginationProps<T>) {
	const id = useId();
	return (
		<div className="mx-auto sm:mx-0 sm:ml-auto flex items-center justify-between flex-col sm:flex-row gap-2">
			{/* Results per page */}
			<div className="flex items-center">
				<Label htmlFor={id} className="font-normal">
					Rows per page:
				</Label>
				<Select
					value={limit.toString()}
					onValueChange={(value) => table.setPageSize(Number(value))}
				>
					<SelectTrigger
						id={id}
						className="w-fit whitespace-nowrap border-0 shadow-none"
					>
						<SelectValue placeholder="Select number of results" />
					</SelectTrigger>
					<SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
						<SelectItem value="10">10</SelectItem>
						<SelectItem value="20">20</SelectItem>
						<SelectItem value="50">50</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Page number information */}
			<div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
				<p
					className="text-muted-foreground text-sm whitespace-nowrap"
					aria-live="polite"
				>
					<span className="text-foreground">
						{from}-{to}
					</span>{" "}
					of <span className="text-foreground">{total}</span>
				</p>
			</div>

			{/* Pagination */}
			<div>
				<PaginationUI>
					<PaginationContent>
						{/* First page button */}
						<PaginationItem>
							<PaginationButton
								className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
								onClick={table.firstPage}
								disabled={!has_prev}
								aria-label="Go to first page"
							>
								<CaretLineLeft size={16} />
							</PaginationButton>
						</PaginationItem>

						{/* Previous page button */}
						<PaginationItem>
							<PaginationButton
								className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
								onClick={table.previousPage}
								disabled={!has_prev}
								aria-label="Go to previous page"
							>
								<CaretLeft size={16} />
							</PaginationButton>
						</PaginationItem>

						{/* Next page button */}
						<PaginationItem>
							<PaginationButton
								className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
								onClick={table.nextPage}
								disabled={!has_next}
								aria-label="Go to next page"
							>
								<CaretRight size={16} />
							</PaginationButton>
						</PaginationItem>

						{/* Last page button */}
						<PaginationItem>
							<PaginationButton
								className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
								onClick={table.lastPage}
								disabled={!has_next}
								aria-label="Go to last page"
							>
								<CaretLineRight size={16} />
							</PaginationButton>
						</PaginationItem>
					</PaginationContent>
				</PaginationUI>
			</div>
		</div>
	);
}
