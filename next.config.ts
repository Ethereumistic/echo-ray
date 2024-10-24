import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: ['assets.aceternity.com'], // Add specific domains here
    // To allow all URLs (not recommended for production)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all hostnames
      },
    ],
  },
};

export default nextConfig;
