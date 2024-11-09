import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@lib': path.resolve(__dirname, 'src/lib'),  // Ensure @lib maps to src/lib
    };
    return config;
  },
};

export default nextConfig;
