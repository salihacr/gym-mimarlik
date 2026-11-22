import type { Metadata } from "next";
import { studio } from "@/content/studio";
import { demoMode } from "./catalog";

const origin = process.env.SITE_URL;
export const siteUrl = origin ? new URL(origin).origin : undefined;
export const indexable =
  Boolean(siteUrl) && !demoMode && process.env.NODE_ENV === "production";
export function metadata(
  path: string,
  title: string,
  description: string,
  cover?: string,
): Metadata {
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: siteUrl + path } : undefined,
    robots: { index: indexable, follow: indexable },
    openGraph: {
      title,
      description,
      siteName: studio.name,
      locale: "tr_TR",
      type: "website",
      url: siteUrl ? siteUrl + path : undefined,
      images: siteUrl
        ? [{ url: new URL(cover || "/studio-social.png", siteUrl).href }]
        : undefined,
    },
  };
}
export const approvedNotice = process.env.PRIVACY_NOTICE_URL?.startsWith(
  "https://",
)
  ? process.env.PRIVACY_NOTICE_URL
  : undefined;
export const contactEnabled = Boolean(
  approvedNotice && process.env.CONTACT_WEBHOOK_URL?.startsWith("https://"),
);
