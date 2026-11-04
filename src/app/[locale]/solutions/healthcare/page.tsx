import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HealthcareSolutionPage } from "@/components/sections/solutions-healthcare/healthcare-solution-page";
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

  const { meta } = (await getDictionary(rawLocale)).healthcareSolution;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/solutions/healthcare",
    title: meta.title,
    description: meta.description,
  });
}

export default async function HealthcareSolutionRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return <HealthcareSolutionPage locale={locale} dictionary={dictionary.healthcareSolution} />;
}
