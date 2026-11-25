import type { NextConfig } from "next";
// Static export for Cloudflare Pages: `next build` writes the whole site to out/.
// Images uploaded from /admin are resized and converted to WebP on upload,
// so Next's on-demand image optimizer is not needed.
const config: NextConfig = {
  output: "export",
  // GitHub Pages project site: NEXT_PUBLIC_BASE_PATH=/gym-mimarlik (see .github/workflows).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  poweredByHeader: false,
  images: { unoptimized: true },
  devIndicators: false,
};
export default config;
