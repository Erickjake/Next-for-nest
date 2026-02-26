import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Nota: cacheComponents não é uma opção padrão do NextConfig.
  // Se estiver usando uma versão experimental específica, pode manter.

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.ericksoncosta.com.br',
        pathname: '/**',
      },
    ],
    // Resolve o problema de "resolved to private ip" no Docker/Dev
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
