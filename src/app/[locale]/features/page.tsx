import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturesIndex } from "@/components/feature-page/features-index";
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

  const { meta } = (await getDictionary(rawLocale)).featuresIndex as Dictionary["featuresIndex"];

  return buildPageMetadata({
    locale: rawLocale,
    path: "/features",
    title: meta.title,
    description: meta.description,
  });
}

export default async function FeaturesIndexRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);
  const { nav, common } = dictionary;
  const copy = dictionary.featuresIndex;

  return (
    <FeaturesIndex
      locale={locale}
      copy={copy}
      items={nav.features.items.slice(1)}
      homeLabel={common.breadcrumbHome}
      parentLabel={undefined}
      parentHref={undefined}
      primaryCta={common.primaryCta}
      secondaryCta={common.secondaryCta}
    />
  );
}