import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppBlueTickPage } from "@/components/sections/whatsApp-blue-tick-page/whatsApp-blue-tick-page";
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

  const { meta } = (await getDictionary(rawLocale)).whatsappBlueTick;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/products/whatsapp-blue-tick",
    title: meta.title,
    description: meta.description,
  });
}

export default async function WhatsAppBlueTickRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return <WhatsAppBlueTickPage locale={locale} dictionary={dictionary.whatsappBlueTick} />;
}
