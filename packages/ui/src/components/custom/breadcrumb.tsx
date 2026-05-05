"use client";
import { Link } from "@repo/i18n/navigation";
import {
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Breadcrumb as BreadcrumbUI,
} from "@repo/ui/components/breadcrumb";
import ButtonGoBack, {
	ButtonGoBackProps,
} from "@repo/ui/components/custom/button-go-back";
import { cn } from "@repo/ui/utils/cn";
import { Fragment } from "react";

type Props = {
	breadcrumbs: {
		title: string;
		href?: string;
	}[];
} & ButtonGoBackProps;

export function Breadcrumb({ href, className, breadcrumbs }: Props) {
	return (
		<div className="flex items-center gap-2">
			{!!href && <ButtonGoBack href={href} className={className} />}
			<BreadcrumbUI>
				<BreadcrumbList>
					{breadcrumbs.map((breadcrumb, index) => (
						<Fragment key={`${breadcrumb.title}-${index}`}>
							<BreadcrumbItem>
								{breadcrumb.href ? (
									<BreadcrumbLink asChild>
										<Link href={breadcrumb.href}>{breadcrumb.title}</Link>
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage
										className={cn(
											index === breadcrumbs.length - 1 && "text-inherit",
										)}
									>
										{breadcrumb.title}
									</BreadcrumbPage>
								)}
							</BreadcrumbItem>

							{index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
						</Fragment>
					))}
				</BreadcrumbList>
			</BreadcrumbUI>
		</div>
	);
}
