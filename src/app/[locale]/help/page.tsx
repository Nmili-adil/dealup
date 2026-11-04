import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpCentrePage } from "@/components/sections/help/help-page";
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

  const { meta } = (await getDictionary(rawLocale)).help;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/help",
    title: meta.title,
    description: meta.description,
  });
}

export default async function HelpRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return <HelpCentrePage locale={locale} dictionary={dictionary.help} />;
}
