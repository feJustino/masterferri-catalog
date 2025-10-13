import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    BLINQ_API_URL: process.env.BLINQ_API_URL,
  },
  images: {
    remotePatterns: [
      { hostname: 'orgbling.s3.amazonaws.com', protocol: 'https' },
    ],
  },
};

export default nextConfig;
