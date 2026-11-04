import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RealEstateSolutionPage } from "@/components/sections/solutions-real-estate/real-estate-solution-page";
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

  const { meta } = (await getDictionary(rawLocale)).realEstateSolution;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/solutions/real-estate",
    title: meta.title,
    description: meta.description,
  });
}

export default async function RealEstateSolutionRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return <RealEstateSolutionPage locale={locale} dictionary={dictionary.realEstateSolution} />;
}
