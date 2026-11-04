import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinanceInsuranceSolutionPage } from "@/components/sections/solutions-finance-insurance/finance-insurance-solution-page";
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

  const { meta } = (await getDictionary(rawLocale)).financeInsuranceSolution;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/solutions/finance-insurance",
    title: meta.title,
    description: meta.description,
  });
}

export default async function FinanceInsuranceSolutionRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return <FinanceInsuranceSolutionPage locale={locale} dictionary={dictionary.financeInsuranceSolution} />;
}
