import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppBusinessApiPage } from "@/components/sections/whatsapp-business-api/whatsapp-business-api-page";
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

  const { meta } = (await getDictionary(rawLocale)).whatsappBusinessApi;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/products/whatsapp-business-api",
    title: meta.title,
    description: meta.description,
  });
}

export default async function WhatsAppBusinessApiRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return (
    <WhatsAppBusinessApiPage
      locale={locale}
      dictionary={dictionary.whatsappBusinessApi}
      productFlow={dictionary.productFlow}
    />
  );
}
