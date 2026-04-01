import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/tomerkk',
  assetPrefix: '/tomerkk',
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
