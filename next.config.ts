import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["http://localhost:3001", "http://localhost:3001",'192.168.11.126'],
};

export default nextConfig;
