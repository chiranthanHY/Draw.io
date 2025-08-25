import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    // Expose environment variables to the browser
    NEXT_PUBLIC_HTTP_URL: process.env.NEXT_PUBLIC_HTTP_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_FE_URL: process.env.NEXT_PUBLIC_FE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
