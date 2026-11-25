// Set NEXT_PUBLIC_BASE_PATH when the site lives under a sub-path
// (e.g. GitHub Pages project sites: /gym-mimarlik). Empty on a custom domain.
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** Prefix a root-relative public asset path (e.g. /uploads/x.webp) with the base path. */
export function withBase(src: string) {
  return basePath && src.startsWith("/") && !src.startsWith("//") && !src.startsWith(basePath + "/")
    ? basePath + src
    : src;
}
