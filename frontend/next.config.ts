import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'static.vecteezy.com', 'encrypted-tbn0.gstatic.com'],
  },
};

export default nextConfig;
