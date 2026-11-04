import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SalesSolutionPage } from "@/components/sections/solutions-sales/sales-solution-page";
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

  const { meta } = (await getDictionary(rawLocale)).salesSolution;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/solutions/sales",
    title: meta.title,
    description: meta.description,
  });
}

export default async function SalesSolutionRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return <SalesSolutionPage locale={locale} dictionary={dictionary.salesSolution} />;
}