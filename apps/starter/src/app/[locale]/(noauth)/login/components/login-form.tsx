"use client";

import EmptyGallerySvg from "@repo/ui/assets/empty-gallery.svg";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@ui/components/button";
import { Form, RHFTextfield } from "@ui/components/form";
import { toast } from "@ui/components/sonner";
import { login } from "api/auth";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { storageKeys } from "@/constants/app";
import type { LoginFormType } from "@/types/auth";

const LoginForm = () => {
	const router = useRouter();
	const form = useForm();
	const { control, handleSubmit } = form;

	const loginMutation = useMutation({
		mutationFn: (values: LoginFormType) =>
			login({ data: { ...values, grant_type: "password" } }),
		onSuccess: (data: { access_token?: string; refresh_token?: string }) => {
			data?.access_token &&
				setCookie(storageKeys.accessToken, data.access_token);
			data?.refresh_token &&
				setCookie(storageKeys.refreshToken, data.refresh_token);
			toast.success("Đăng nhập thành công");
			router.replace("/");
		},
		onError: (error) => {
			toast.error(error.message || "Đăng nhập thất bại");
		},
	});

	const onSubmit = (values: any) => {
		loginMutation.mutate(values);
	};
	return (
		<div className="flex flex-col gap-4 w-md max-w-full">
			<div className="flex flex-col justify-center items-center gap-2">
				<div className="flex size-24 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-xs">
					<Image
						alt=""
						className="size-16"
						height={64}
						src={EmptyGallerySvg}
						width={64}
					/>
				</div>
				<p className="text-center text-3xl font-semibold">Đăng nhập</p>
				<p className="text-center font-medium text-description">
					Vui lòng đăng nhập để bắt đầu giao dịch và quản lý sản phẩm.
				</p>
			</div>
			<Form {...form}>
				<form
					id="login-form"
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<RHFTextfield
						control={control}
						name="username"
						label="Tên đăng nhập"
						placeholder="Nhập tên đăng nhập"
					/>

					<RHFTextfield
						control={control}
						name="password"
						type="password"
						label="Mật khẩu"
						placeholder="Nhập mật khẩu"
					/>

					<Button
						type="submit"
						className="w-full"
						loading={loginMutation.isPending}
					>
						Đăng nhập
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
