import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@insightfy/ui"],
  eslint: {
    // Type-safety is enforced by `tsc` / the Next type checker; linting runs
    // separately via `pnpm lint` so it never blocks production builds.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
