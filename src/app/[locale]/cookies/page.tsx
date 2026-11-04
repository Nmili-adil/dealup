import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/sections/legal/legal-page";
import { getLegalContent } from "@/content/legal";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const { meta } = (await getDictionary(rawLocale)).cookies;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/cookies",
    title: meta.title,
    description: meta.description,
  });
}

export default async function CookiesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const content = getLegalContent(locale);

  return (
    <LegalPage
      content={content.cookies}
      backLabel={locale === "fr" ? "Retour" : locale === "ar" ? "رجوع" : "Back"}
      backHref={`/${locale}/`}
    />
  );
}
