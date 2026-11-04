import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppMarketingPage } from "@/components/sections/whatsapp-marketing/whatsapp-marketing-page";
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

  const { meta } = (await getDictionary(rawLocale)).whatsappMarketing;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/products/whatsapp-marketing",
    title: meta.title,
    description: meta.description,
  });
}

export default async function WhatsAppMarketingRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return <WhatsAppMarketingPage locale={locale} dictionary={dictionary.whatsappMarketing} />;
}
