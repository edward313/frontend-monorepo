import { Link } from "@repo/i18n/navigation";
import { getTranslations } from "@repo/i18n/server";
import UiInputsDemo from "./ui-inputs-demo";

export default async function HomePage() {
	const t = await getTranslations("HomePage");
	return (
		<div className="px-6 pb-12">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-xl font-semibold">{t("title")}</h1>
				<Link className="text-sm underline" href="/about">
					{t("about")}
				</Link>
			</div>
			<UiInputsDemo />
		</div>
	);
}
