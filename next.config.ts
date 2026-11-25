import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    // The photos never change under the same file name, so keep optimized copies for a month.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
