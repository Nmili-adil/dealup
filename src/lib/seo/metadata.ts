import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/locales";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dealup.ma").replace(/\/$/, "");

const hreflangByLocale: Record<Locale, string> = {
  fr: "fr-MA",
  ar: "ar-MA",
  en: "en",
};

/** Builds locale alternates + canonical for a locale-agnostic path (e.g. "/pricing" or "/"). */
export function buildAlternates(locale: Locale, path: string = "/") {
  const normalized = path === "/" ? "" : path.replace(/^\/|\/$/g, "");
  const pathFor = (l: Locale) => (normalized ? `/${l}/${normalized}/` : `/${l}/`);

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[hreflangByLocale[l]] = `${siteUrl}${pathFor(l)}`;
  }
  languages["x-default"] = `${siteUrl}${pathFor("fr")}`;

  return {
    canonical: `${siteUrl}${pathFor(locale)}`,
    languages,
  };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const alternates = buildAlternates(locale, path);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: "Dealup",
      locale: hreflangByLocale[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export { siteUrl };
