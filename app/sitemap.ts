import type { MetadataRoute } from "next";
import { navigation } from "@/content/studio";
import { catalog } from "@/lib/catalog";
import { siteUrl, indexable } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable || !siteUrl) return [];
  return [
    ...navigation.map(([path]) => path),
    ...catalog()
      .filter((p) => p.publication === "published")
      .map((p) => "/projeler/" + p.slug),
  ].map((path) => ({ url: siteUrl + path }));
}
