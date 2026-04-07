import { Columns } from "@phosphor-icons/react";
import { Button } from "@repo/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import type { Table } from "@tanstack/react-table";

type Props<T> = {
	table: Table<T>;
};

const VisibilityColumns = <T,>({ table }: Props<T>) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Columns size={16} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onSelect={(e) => e.preventDefault()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{column.columnDef?.header?.toString() || column.id}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { VisibilityColumns };
