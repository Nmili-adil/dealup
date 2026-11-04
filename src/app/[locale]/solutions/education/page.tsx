import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EducationSolutionPage } from "@/components/sections/solutions-education/education-solution-page";
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

  const { meta } = (await getDictionary(rawLocale)).educationSolution;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/solutions/education",
    title: meta.title,
    description: meta.description,
  });
}

export default async function EducationSolutionRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return <EducationSolutionPage locale={locale} dictionary={dictionary.educationSolution} />;
}
