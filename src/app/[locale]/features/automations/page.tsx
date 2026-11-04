import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturePage } from "@/components/feature-page/feature-page";
import { HeroMockup } from "@/components/feature-page/hero-mockup";
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

  const { meta } = (await getDictionary(rawLocale)).automationsFeature;

  return buildPageMetadata({
    locale: rawLocale,
    path: "/features/automations",
    title: meta.title,
    description: meta.description,
  });
}

export default async function AutomationsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);
  const { nav, common } = dictionary;
  const copy = dictionary.automationsFeature;

  return (
    <FeaturePage
      locale={locale}
      copy={copy}
      parentLabel={nav.features.items[0].title}
      parentHref={nav.features.items[0].href}
      homeLabel={common.breadcrumbHome}
      primaryCta={common.primaryCta}
      secondaryCta={common.secondaryCta}
      visual={
        <HeroMockup
          name="automations-hero"
          alt={copy.hero.imageAlt}
        />
      }
    />
  );
}
