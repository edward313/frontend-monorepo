"use client";

import type { Account } from "@repo/shared";
import apiConfig from "@repo/shared/api-client/config";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "@ui/components/custom/breadcrumb";
import { Separator } from "@ui/components/separator";
import { TableServer } from "@ui/components/tanstack-table/table-server";
import type { ColumnCustom } from "@ui/types/common";
import { accountApi } from "api/account";

export default function AdminPage() {
	const { data: res } = useQuery({
		queryKey: [apiConfig.account.list.url],
		queryFn: () => accountApi.getList(),
	});
	console.log();
	const columns = (): ColumnCustom<Account>[] => {
		return [
			{
				accessorKey: "username",
				header: "Header",
				enableSorting: false,
			},
		];
	};
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2.5">
				<Breadcrumb breadcrumbs={[{ title: "admin" }, { title: "admin" }]} />

				<Separator />
			</div>

			<TableServer columns={columns()} data={res?.data?.content || []} />
		</div>
	);
}
