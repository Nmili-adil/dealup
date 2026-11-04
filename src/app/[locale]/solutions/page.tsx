import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionsIndex } from "@/components/feature-page/solutions-index";
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

  const { meta } = (await getDictionary(rawLocale)).solutionsIndex;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/solutions",
    title: meta.title,
    description: meta.description,
  });
}

export default async function SolutionsIndexRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);
  const { nav, common } = dictionary;
  const copy = dictionary.solutionsIndex;

  return (
    <SolutionsIndex
      locale={locale}
      copy={copy}
      solutionItems={nav.solutions.items}
      industryItems={nav.industries.items}
      homeLabel={common.breadcrumbHome}
      primaryCta={common.primaryCta}
      secondaryCta={common.secondaryCta}
    />
  );
}