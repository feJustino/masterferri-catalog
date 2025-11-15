import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    BLINQ_API_URL: process.env.BLINQ_API_URL,
    NEXT_PUBLIC_BASE_URL: process.env.SITE_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
  },
  images: {
    remotePatterns: [
      { hostname: 'orgbling.s3.amazonaws.com', protocol: 'https' },
    ],
  },
};

export default nextConfig;
