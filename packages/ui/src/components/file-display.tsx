"use client";

import type { FileWithPreview } from "@repo/ui/hooks/use-file-upload";
import { cn } from "@repo/ui/utils/cn";
import { FileIcon } from "lucide-react";

const previewClassName = "h-full w-full object-cover";

type Props = {
	file: FileWithPreview;
	className?: string;
};

export default function FileDisplay({ file, className }: Props) {
	const fileType = file.file instanceof File ? file.file.type : file.file.type;
	const fileName = file.file instanceof File ? file.file.name : file.file.name;
	const previewUrl = file.preview;

	const isImage = !!previewUrl && fileType.startsWith("image/");
	const isVideo = !!previewUrl && fileType.startsWith("video/");

	return (
		<div
			className={cn(
				"bg-muted/20 flex w-full items-center justify-center overflow-hidden rounded-lg",
				className,
			)}
		>
			{isImage && (
				<img alt={fileName} src={previewUrl} className={previewClassName} />
			)}
			{isVideo && (
				<video
					src={previewUrl}
					className={previewClassName}
					controls
					playsInline
				/>
			)}
			{!isImage && !isVideo && (
				<div className="text-muted-foreground flex flex-col items-center gap-2 p-6 text-center text-sm">
					<FileIcon className="size-6" aria-hidden="true" />
					<span className="truncate max-w-full">{fileName}</span>
				</div>
			)}
		</div>
	);
}
