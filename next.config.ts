import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "Datheon_Vibe_Coding_Mastery_-_Capstone_Project";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
