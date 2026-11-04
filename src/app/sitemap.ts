import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/locales";
import { siteUrl } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "fr" ? 1 : 0.8,
  }));
}
