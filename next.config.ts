import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Matches the port in your error URL
        pathname: '/**',
        search: '', // Matches the path structure
      },
    ],
  },
};
export default nextConfig;
