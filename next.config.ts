// next.config.ts or next.config.js

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
