"use client";

import { TrashIcon, UploadIcon } from "@phosphor-icons/react";
import { Button } from "@repo/ui/components/button";
import FileDisplay from "@repo/ui/components/file-display";
import {
	type FileUploadOptions,
	type FileWithPreview,
	useFileUpload,
} from "@repo/ui/hooks/use-file-upload";
import { cn } from "@repo/ui/utils/cn";
import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { type Control, useFormContext, useWatch } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./base";

const maxSizeMB = 50;
const maxSize = maxSizeMB * 1024 * 1024; // 50MB default

type Props = {
	control: Control<any>;
	name: string;
	label?: string;
	classNameWrapper?: string;
	className?: string;
	description?: string;
	required?: boolean;
	multiple?: boolean;
	disabled?: boolean;
} & FileUploadOptions;

export function RHFUpload({
	control,
	name,
	label,
	description,
	required = false,
	multiple = false,
	classNameWrapper,
	className,
	disabled = false,
	...props
}: Props) {
	const { setValue } = useFormContext();
	const tCommon = useTranslations("Common");

	const files: FileWithPreview[] = useWatch({
		control,
		name,
	});

	const [
		{ isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			clearFiles,
			getInputProps,
		},
	] = useFileUpload({
		maxSize,
		multiple: multiple,
		accept: props.accept,
		maxFiles: props.maxFiles,
		initialFiles: props?.initialFiles?.length
			? props?.initialFiles
			: files?.length > 0
				? files
				: [],
		onFilesChange: (files) => {
			setTimeout(() => {
				setValue(name, files, { shouldValidate: true });
			}, 0);
		},
	});
	return (
		<FormField
			control={control}
			name={name}
			render={({ fieldState: { invalid } }) => (
				<FormItem className={classNameWrapper}>
					<FormLabel htmlFor={name}>
						{label} {required && <span className="text-destructive">*</span>}
					</FormLabel>
					<FormControl>
						<div className="relative w-full h-full">
							<div className="flex flex-col gap-2 h-full">
								{multiple ? (
									<div
										onClick={
											(!files || files?.length <= 0) && !disabled
												? () => openFileDialog()
												: undefined
										}
										onDragEnter={handleDragEnter}
										onDragLeave={handleDragLeave}
										onDragOver={handleDragOver}
										onDrop={handleDrop}
										data-dragging={isDragging || undefined}
										data-files={files?.length > 0 || undefined}
										data-disabled={disabled || undefined}
										className={cn(
											"border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-48 h-full flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]",
											"data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
											{
												"border-destructive ring-[3px] ring-destructive/20 bg-destructive/5":
													invalid,
											},
											className,
										)}
									>
										<input
											{...getInputProps()}
											className="sr-only"
											aria-label="Upload image file"
										/>
										{files?.length > 0 ? (
											<div className="flex w-full flex-col gap-3 h-full">
												<div className="flex items-center justify-between flex-wrap gap-2 mb-4">
													<h3 className="truncate text-sm font-medium">
														Files ({files.length})
													</h3>
													<div className="flex flex-wrap gap-2">
														<Button
															type="button"
															variant="outline"
															size="sm"
															onClick={(event) => {
																event.stopPropagation();
																event.preventDefault();
																openFileDialog();
															}}
														>
															<ImageUpIcon
																className="-ms-0.5 size-3.5 opacity-60"
																aria-hidden="true"
															/>
															{tCommon("actions.add")} file
														</Button>
														<Button
															type="button"
															variant="outline"
															size="sm"
															onClick={(event) => {
																event.stopPropagation();
																event.preventDefault();
																clearFiles();
															}}
														>
															<TrashIcon
																className="-ms-0.5 size-3.5 opacity-60"
																aria-hidden="true"
															/>
															{tCommon("actions.clear-all")}
														</Button>
													</div>
												</div>

												<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 h-full">
													{files.map((file) => (
														<div
															key={file.id}
															className="bg-background relative flex flex-col border rounded-lg h-fit"
														>
															<FileDisplay file={file} />

															<div className="absolute top-2 right-2">
																<Button
																	type="button"
																	className="focus-visible:border-ring focus-visible:ring-ring/50 z-40 flex size-6 has-[>svg]:px-1 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
																	onClick={(event) => {
																		event.stopPropagation();
																		event.preventDefault();
																		removeFile(file.id);
																	}}
																	aria-label="Remove image"
																>
																	<XIcon
																		className="size-4"
																		aria-hidden="true"
																	/>
																</Button>
															</div>
														</div>
													))}
												</div>
											</div>
										) : (
											<div className="flex flex-col items-center justify-center px-4 py-3 text-center">
												<div
													className="mb-2 flex size-11 shrink-0 items-center justify-center"
													aria-hidden="true"
												>
													<UploadIcon
														weight="fill"
														className="size-12 opacity-40"
													/>
												</div>
												<p className="mb-1.5 text-sm text-description">
													<span className="font-medium">
														{tCommon("upload")}
													</span>
												</p>
											</div>
										)}
									</div>
								) : (
									<div className="relative h-full">
										{/* Drop area */}
										<div
											onClick={!disabled ? () => openFileDialog() : undefined}
											onDragEnter={handleDragEnter}
											onDragLeave={handleDragLeave}
											onDragOver={handleDragOver}
											onDrop={handleDrop}
											data-dragging={isDragging || undefined}
											data-disabled={disabled || undefined}
											className={cn(
												"border-input hover: data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-48 h-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]",
												"data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
												{
													"border-destructive ring-[3px] ring-destructive/20 bg-destructive/5":
														invalid,
												},
												className,
											)}
										>
											<input
												{...getInputProps()}
												className="sr-only"
												aria-label="Upload file"
											/>
											{files?.length ? (
												<Fragment>
													<div className="absolute inset-0">
														<FileDisplay
															file={files[0]}
															className={className}
														/>
													</div>

													<div className="absolute top-2 right-2">
														<Button
															type="button"
															className="focus-visible:border-ring focus-visible:ring-ring/50 z-40 flex size-6 has-[>svg]:px-1 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
															onClick={(event) => {
																event.stopPropagation();
																event.preventDefault();
																removeFile(files[0]?.id);
															}}
															aria-label="Remove image"
														>
															<XIcon className="size-4" aria-hidden="true" />
														</Button>
													</div>
												</Fragment>
											) : (
												<div className="flex flex-col items-center justify-center px-4 py-3 text-center">
													<div
														className="mb-2 flex size-11 shrink-0 items-center justify-center"
														aria-hidden="true"
													>
														<UploadIcon
															weight="fill"
															className="size-12 opacity-40"
														/>
													</div>
													<p className="mb-1.5 text-sm text-description">
														<span className="font-medium">
															{tCommon("upload")}
														</span>
													</p>
												</div>
											)}
										</div>
									</div>
								)}

								{errors.length > 0 && (
									<div
										className="text-destructive flex items-center gap-1 text-xs"
										role="alert"
									>
										<AlertCircleIcon className="size-3 shrink-0" />
										<span>{errors[0]}</span>
									</div>
								)}
							</div>
						</div>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
