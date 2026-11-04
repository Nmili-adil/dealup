import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MetaAdsManagerPage } from "@/components/sections/meta-ads-manager/meta-ads-manager-page";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const { meta } = (await getDictionary(rawLocale)).metaAdsManager;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/products/dealup-meta-ads-manager",
    title: meta.title,
    description: meta.description,
  });
}

export default async function MetaAdsManagerRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return <MetaAdsManagerPage locale={locale} dictionary={dictionary.metaAdsManager} />;
}
