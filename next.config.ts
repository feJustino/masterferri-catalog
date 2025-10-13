import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    BLINQ_API_URL: process.env.BLINQ_API_URL,
    NEXT_PUBLIC_BASE_URL: 'https://example.masterferri.com.br',
  },
  images: {
    remotePatterns: [
      { hostname: 'orgbling.s3.amazonaws.com', protocol: 'https' },
    ],
  },
};

export default nextConfig;
