import path from "node:path";
import createNextIntlPlugin from "@repo/i18n/plugin";
import type { NextConfig } from "next";

const baseConfig: NextConfig = {
	reactStrictMode: true,
	transpilePackages: ["@repo/ui", "@repo/i18n"],
	output: "standalone",
	outputFileTracingRoot: path.join(process.cwd(), "../../"),
};

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = withNextIntl(baseConfig);

export default nextConfig;
