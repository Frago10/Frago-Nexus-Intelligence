/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [
      "motion",
      "@react-three/fiber",
      "@react-three/drei",
      "@react-three/postprocessing",
      "three",
    ],
  },
  // We render no <Image>s currently; restrict remotes if added later.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
