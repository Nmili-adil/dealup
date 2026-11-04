import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppFormsPage } from "@/components/sections/whatsapp-forms/whatsapp-forms-page";
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

  const { meta } = (await getDictionary(rawLocale)).whatsappForms;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/products/whatsapp-forms",
    title: meta.title,
    description: meta.description,
  });
}

export default async function WhatsAppFormsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return <WhatsAppFormsPage locale={locale} dictionary={dictionary.whatsappForms} />;
}
