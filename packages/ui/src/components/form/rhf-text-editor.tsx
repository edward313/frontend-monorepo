"use client";
import { cn } from "@repo/ui/utils/cn";
import { Editor } from "@tinymce/tinymce-react";
import { Loader } from "lucide-react";

import { useRef } from "react";
import type { Control } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./base";

type Props = {
	control: Control<any>;
	name: string;
	label?: string;
	placeholder?: string;
	classNameWrapper?: string;
	description?: string;
	loading?: boolean;
	required?: boolean;
	disabled?: boolean;
};

export const RHFTextEditor = ({
	control,
	name,
	label,
	placeholder,
	classNameWrapper,
	description,
	required,
	disabled,
	loading = false,
	...props
}: Props) => {
	const editorRef = useRef<unknown | null>(null);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState: { invalid } }) => (
				<FormItem className={cn("w-full", classNameWrapper)}>
					<FormLabel htmlFor={name}>
						{label} {required && <span className="text-destructive">*</span>}
					</FormLabel>
					<FormControl>
						<div
							className={cn(
								"relative w-full rounded-lg [&_.tox-edit-focus]:!border-ring [&_.tox-edit-focus]:!ring-ring/30 [&_.tox-edit-focus]:!ring-[3px] [&_.tox_.tox-edit-area::before]:!border-0",
								{
									"outline outline-destructive": invalid,
								},
							)}
						>
							<Editor
								{...props}
								onInit={(_evt: unknown, editor: any) => {
									const getEl = document.querySelector(".tox-silver-sink");
									const container = document.getElementById("dialog-content");
									if (container && getEl) {
										container.appendChild(getEl);
									}
									editorRef.current = editor;
								}}
								apiKey={process.env.NEXT_PUBLIC_KEY_EDITOR!}
								disabled={disabled || loading}
								value={field.value}
								onEditorChange={field.onChange}
								init={{
									menubar: false,
									contextmenu: false,
									height: 400,
									file_picker_types: "image",
									plugins: [
										"advlist",
										"autolink",
										"lists",
										"link",
										"image",
										"charmap",
										"preview",
										"anchor",
										"searchreplace",
										"visualblocks",
										"code",
										"fullscreen",
										"insertdatetime",
										"media",
										"code",
										"help",
										"wordcount",
									],
									toolbar:
										"undo redo | blocks | " +
										"bold italic | alignleft aligncenter " +
										"alignright alignjustify | bullist numlist | " +
										"image removeformat | code",
								}}
							/>

							{loading && (
								<Loader
									size={16}
									className="animate-spin absolute top-2/4 right-2 -translate-y-2/4 opacity-50"
								/>
							)}
						</div>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export const RHFTexteditor = RHFTextEditor;
