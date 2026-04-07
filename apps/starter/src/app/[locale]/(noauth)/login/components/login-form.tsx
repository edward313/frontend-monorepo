"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@ui/components/button";
import { Form, RHFTextfield } from "@ui/components/form";
import { toast } from "@ui/components/sonner";
import { login } from "api/auth";
import { useForm } from "react-hook-form";
import type { LoginFormType } from "@/types/auth";

const LoginForm = () => {
	const form = useForm();
	const { control, handleSubmit } = form;

	const loginMutation = useMutation({
		mutationFn: (values: LoginFormType) =>
			login({ data: { ...values, grant_type: "password" } }),
		onSuccess: () => {
			toast.success("Đăng nhập thành công");
		},
		onError: (error) => {
			const message =
				error instanceof Error ? error.message : "Đăng nhập thất bại";
			toast.error(message);
		},
	});

	const onSubmit = (values: any) => {
		loginMutation.mutate(values);
	};
	return (
		<div className="flex flex-col gap-4 w-md max-w-full">
			<div className="flex flex-col justify-center items-center gap-2">
				<p className="text-center text-3xl font-semibold">Đăng nhập</p>
				<p className="text-center font-medium text-description">
					Vui lòng đăng nhập để bắt đầu giao dịch và quản lý sản phẩm.
				</p>
			</div>
			<Form {...form}>
				<form
					id="login-form"
					onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
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
