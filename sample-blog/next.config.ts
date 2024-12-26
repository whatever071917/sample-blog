import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint in production builds
  },
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript errors in production builds
  },
};

export default nextConfig;
