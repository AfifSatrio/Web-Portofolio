/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep QA builds separate when a development server is running.
  distDir: process.env.PORTFOLIO_BUILD_DIR || ".next",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
