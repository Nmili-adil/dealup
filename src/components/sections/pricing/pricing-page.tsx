import { Container } from "@/components/layout/container";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { PricingHero } from "./pricing-hero";
import { PricingPlans } from "./pricing-plans";
import { PricingComparison } from "./pricing-comparison";
import { PricingFaq } from "./pricing-faq";
import { PricingFinalCta } from "./pricing-final-cta";

export function PricingPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["pricing"];
}) {
  return (
    <div className="overflow-hidden bg-white">
      <PricingHero dictionary={dictionary.hero} />

      <PricingPlans locale={locale} dictionary={dictionary} />

      <Container className="max-w-[1280px]">
        <PricingComparison dictionary={dictionary} />
      </Container>

      <Container className="max-w-[1280px]">
        <PricingFaq dictionary={dictionary.faq} />
        <PricingFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
