import { useTranslations } from "@repo/i18n";
import { Input } from "@repo/ui/components/input";
import { useDebouncedCallback } from "@repo/ui/hooks/use-debounced-callback";
import { SearchIcon } from "lucide-react";
import { ComponentProps, useEffect, useState } from "react";

type Props = {
	searchParams?: string;
	defaultValue?: string;
	debounce?: number;
	onChangeCallBack?: (val: string | undefined) => void;
	type?: React.HTMLInputTypeAttribute;
} & Omit<ComponentProps<typeof Input>, "onChange" | "value">;

const GlobalSearch = ({
	debounce = 500,
	defaultValue,
	onChangeCallBack,
}: Props) => {
	const tCommon = useTranslations("Common");
	const [value, setValue] = useState<string>(defaultValue || "");

	useEffect(() => {
		setValue(defaultValue ?? "");
	}, [defaultValue]);
	const debouncedSetFilterSearch = useDebouncedCallback(
		(value: string | undefined) => {
			onChangeCallBack?.(value);
		},
		debounce,
	);

	return (
		<div className="relative">
			<Input
				prefix={<SearchIcon size={16} aria-hidden="true" />}
				placeholder={`${tCommon("search")}...`}
				value={value || ""}
				type="text"
				onChange={(value: string) => {
					setValue(value);
					debouncedSetFilterSearch(value);
				}}
			/>
		</div>
	);
};

export { GlobalSearch };
