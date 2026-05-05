"use client";

import { Breadcrumb } from "@ui/components/custom/breadcrumb";
import { Separator } from "@ui/components/separator";
import { TableServer } from "@ui/components/tanstack-table/table-server";

export default function AdminPage() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2.5">
				<Breadcrumb breadcrumbs={[{ title: "admin" }, { title: "admin" }]} />

				<Separator />
			</div>

			<TableServer columns={[]} data={[]} />
		</div>
	);
}
