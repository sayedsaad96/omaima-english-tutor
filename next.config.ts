import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  ...(process.env.CF_PAGES === '1' && {
    output: 'export',
    images: { unoptimized: true },
  }),
};

export default nextConfig;
