import type { MetadataRoute } from "next";
import { siteUrl, indexable } from "@/lib/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return indexable
    ? {
        rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/demo/"] },
        sitemap: siteUrl + "/sitemap.xml",
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
