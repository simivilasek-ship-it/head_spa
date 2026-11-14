import type { NextConfig } from "next";

/**
 * Produkce = vlastní doména sarya-headspa.cz (GitHub Pages + CNAME).
 * BasePath `/head_spa` jen když GITHUB_PAGES=true (náhled na *.github.io/head_spa/).
 */
const repo = "head_spa";
const isGithubPagesPreview = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPagesPreview ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // cacheComponents / PPR nejdou se static exportem (GitHub Pages)
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    qualities: [75, 80, 92, 100],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
