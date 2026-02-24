import SuffixSelectlect, {
	type SuffixSelectlectProps,
} from "@repo/ui/components/prefix-select";
import { cn } from "@repo/ui/utils/cn";
import { Loader, XIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export type SuffixAreaProps = SuffixSelectlectProps & {
	value: number | string | undefined;
	loading?: boolean;
	disabled?: boolean;
	suffixIcon?: React.ReactNode;
	onClear?: () => void;
	allowClear?: boolean;
};

export type UseSuffixAreaOptions = {
	enabled?: boolean; // enable dynamic padding measuring
	extraGapPx?: number; // gap between input text and right area
	fallbackPaddingPx?: number; // fallback padding when measuring not ready
};

export const useSuffixArea = (
	props: SuffixAreaProps,
	options: UseSuffixAreaOptions = {},
) => {
	const {
		value,
		loading,
		disabled,
		suffixIcon,
		onClear,
		// select props
		options: selectOptions,
		isShowSelect,
		selectValue,
		onChangeSelect,
		disabledSelect,
		allowClear = true,
	} = props;

	const { enabled = true, extraGapPx = 8, fallbackPaddingPx = 116 } = options;

	const rightRef = useRef<HTMLDivElement>(null);
	const [paddingRight, setPaddingRight] = useState<number | undefined>(
		enabled ? undefined : isShowSelect ? fallbackPaddingPx : undefined,
	);

	useEffect(() => {
		if (!enabled) return;
		const measure = () => {
			const width = rightRef.current?.offsetWidth ?? 0;
			setPaddingRight(width ? width + extraGapPx : undefined);
		};
		measure();
		const node = rightRef.current;
		const ro = node ? new ResizeObserver(measure) : null;
		if (node && ro) ro.observe(node);
		window.addEventListener("resize", measure);
		return () => {
			window.removeEventListener("resize", measure);
			if (ro) ro.disconnect();
		};
	}, [enabled, extraGapPx]);

	const inputPaddingStyle = useMemo(() => {
		return paddingRight ? { paddingRight } : undefined;
	}, [paddingRight]);

	const inputPaddingClass = useMemo(() => {
		return !paddingRight && isShowSelect
			? `pr-[${fallbackPaddingPx}px]`
			: undefined;
	}, [paddingRight, isShowSelect, fallbackPaddingPx]);

	const RightArea = useMemo(() => {
		return (
			<div
				className="absolute right-0 flex items-center justify-center h-full text-muted-foreground/80 pe-3 peer-disabled:opacity-50"
				ref={rightRef}
			>
				{suffixIcon ? (
					suffixIcon
				) : loading ? (
					<Loader
						size={16}
						className="animate-spin absolute top-2/4 right-2 -translate-y-2/4 opacity-50"
					/>
				) : (
					allowClear && (
						<div
							className={cn(
								"hidden cursor-pointer h-full items-center justify-center",
								{
									flex: !!value && value !== 0,
								},
							)}
							onClick={() => {
								if (disabled || loading) return;
								onClear?.();
							}}
						>
							<XIcon />
						</div>
					)
				)}
				<SuffixSelectlect
					options={selectOptions}
					isShowSelect={isShowSelect}
					selectValue={selectValue}
					onChangeSelect={onChangeSelect}
					disabledSelect={disabledSelect || loading || disabled}
				/>
			</div>
		);
	}, [
		disabled,
		disabledSelect,
		enabled,
		isShowSelect,
		loading,
		onChangeSelect,
		onClear,
		selectOptions,
		selectValue,
		suffixIcon,
		value,
	]);

	return { RightArea, inputPaddingStyle, inputPaddingClass } as const;
};
