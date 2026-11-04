import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { JsonLd, buildFaqJsonLd } from "@/components/seo/json-ld";
import { HeroHome } from "@/components/sections/home/hero-home";
import { TrustBar } from "@/components/sections/home/trust-bar";
import { Industries } from "@/components/sections/home/industries";
import { Journey } from "@/components/sections/home/journey";
import { Workflow } from "@/components/sections/home/workflow";
import { EarlyAccess } from "@/components/sections/home/early-access";
import { IntegrationLogos } from "@/components/sections/home/integration-logos";
import { AdvancedFeatures } from "@/components/sections/home/advanced-features";
import { Assurances } from "@/components/sections/home/assurances";
import { FaqHome } from "@/components/sections/home/faq-home";
import { FinalCtaBanner } from "@/components/sections/home/final-cta-banner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);
  const home = dictionary.home;

  return (
    <>
      <JsonLd data={buildFaqJsonLd(home.faq.items)} />

      {/* Warm sand hero, then a white page with mint bands marking each beat:
          trust → workflow → early access → assurances. */}
      <HeroHome locale={locale} dictionary={home.hero} />
      <TrustBar dictionary={home.trustBar} />
      <Industries dictionary={home.industries} />
      <Journey dictionary={home.journey} />
      <Workflow dictionary={home.workflow} />
      <EarlyAccess dictionary={home.earlyAccess} />
      <IntegrationLogos dictionary={home.integrations} />
      <AdvancedFeatures dictionary={home.advancedFeatures} />
      <Assurances dictionary={home.assurances} />
      <FaqHome dictionary={home.faq} />
      <FinalCtaBanner locale={locale} dictionary={home.finalCta} />
    </>
  );
}
