"use client";
import { useTranslations } from "@repo/i18n";
import { Link } from "@repo/i18n/navigation";
import { Combobox } from "@ui/components/combobox";
import type { Option } from "@ui/types/common";
import { useState } from "react";

export default function AuthHomePage() {
	const t = useTranslations("AuthDashboard");
	const [comboValue, setComboValue] = useState<Option | null>(null);
	const comboOptions: Option[] = [
		{ id: 1, name: "Option 1" },
		{ id: 2, name: "Option 2" },
		{ id: 3, name: "Option 3" },
	];
	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">{t("title")}</h1>
					<p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
				</div>
				<div className="flex gap-3">
					<Link className="text-sm underline" href="/">
						{t("backHome")}
					</Link>
					<Link className="text-sm underline" href="/login">
						{t("login")}
					</Link>
				</div>
			</div>
			<Combobox
				options={comboOptions}
				placeholder=""
				onChange={(option) => setComboValue(option)}
				value={comboValue?.id}
				allowClear
			/>
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<div className="rounded-lg border p-4">
					<p className="text-xs uppercase text-muted-foreground">
						{t("cards.revenue.label")}
					</p>
					<p className="mt-2 text-2xl font-semibold">$42,980</p>
					<p className="mt-1 text-xs text-muted-foreground">
						{t("cards.revenue.note")}
					</p>
				</div>
				<div className="rounded-lg border p-4">
					<p className="text-xs uppercase text-muted-foreground">
						{t("cards.orders.label")}
					</p>
					<p className="mt-2 text-2xl font-semibold">1,204</p>
					<p className="mt-1 text-xs text-muted-foreground">
						{t("cards.orders.note")}
					</p>
				</div>
				<div className="rounded-lg border p-4">
					<p className="text-xs uppercase text-muted-foreground">
						{t("cards.activeUsers.label")}
					</p>
					<p className="mt-2 text-2xl font-semibold">9,312</p>
					<p className="mt-1 text-xs text-muted-foreground">
						{t("cards.activeUsers.note")}
					</p>
				</div>
				<div className="rounded-lg border p-4">
					<p className="text-xs uppercase text-muted-foreground">
						{t("cards.tickets.label")}
					</p>
					<p className="mt-2 text-2xl font-semibold">128</p>
					<p className="mt-1 text-xs text-muted-foreground">
						{t("cards.tickets.note")}
					</p>
				</div>
			</div>

			<div className="grid gap-4 lg:grid-cols-3">
				<div className="rounded-lg border p-4 lg:col-span-2">
					<p className="text-sm font-medium">{t("overview.title")}</p>
					<div className="mt-4 grid gap-3 md:grid-cols-3">
						<div className="rounded-md bg-muted p-3">
							<p className="text-xs text-muted-foreground">
								{t("overview.avgOrder")}
							</p>
							<p className="mt-1 text-lg font-semibold">$58.20</p>
						</div>
						<div className="rounded-md bg-muted p-3">
							<p className="text-xs text-muted-foreground">
								{t("overview.conversion")}
							</p>
							<p className="mt-1 text-lg font-semibold">3.9%</p>
						</div>
						<div className="rounded-md bg-muted p-3">
							<p className="text-xs text-muted-foreground">
								{t("overview.newLeads")}
							</p>
							<p className="mt-1 text-lg font-semibold">284</p>
						</div>
					</div>
				</div>
				<div className="rounded-lg border p-4">
					<p className="text-sm font-medium">{t("channels.title")}</p>
					<ul className="mt-3 space-y-2 text-sm">
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">
								{t("channels.organic")}
							</span>
							<span className="font-medium">48%</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">
								{t("channels.email")}
							</span>
							<span className="font-medium">22%</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">{t("channels.ads")}</span>
							<span className="font-medium">18%</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">
								{t("channels.social")}
							</span>
							<span className="font-medium">12%</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
