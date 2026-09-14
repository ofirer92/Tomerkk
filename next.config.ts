import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
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
