import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  allowedDevOrigins: ['172.20.10.7'],
  // or allow all local network IPs:
  // allowedDevOrigins: ['192.168.*.*', '172.*.*.*', '10.*.*.*'],
};

export default nextConfig;
