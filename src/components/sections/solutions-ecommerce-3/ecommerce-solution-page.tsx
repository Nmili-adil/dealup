import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { EcommerceAutomation } from "./ecommerce-automation";
import { EcommerceCatalog } from "./ecommerce-catalog";
import { EcommerceFinalCta } from "./ecommerce-final-cta";
import { EcommerceGrowth } from "./ecommerce-growth";
import { EcommerceHero } from "./ecommerce-hero";
import { EcommerceInbox } from "./ecommerce-inbox";
import { EcommerceJourney } from "./ecommerce-journey";
import { EcommercePlaybooks } from "./ecommerce-playbooks";
import { EcommerceTrustFaq } from "./ecommerce-trust-faq";

type Copy = Dictionary["ecommerceSolution"];

export function EcommerceSolutionPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <EcommerceHero locale={locale} dictionary={dictionary.hero} />
      <EcommerceJourney dictionary={dictionary.journey} />
      <EcommerceCatalog locale={locale} dictionary={dictionary.catalog} />
      <EcommerceAutomation locale={locale} dictionary={dictionary.automation} />
      <EcommerceGrowth locale={locale} dictionary={dictionary.growth} />
      <EcommercePlaybooks dictionary={dictionary.playbooks} />
      <EcommerceInbox locale={locale} dictionary={dictionary.inbox} />

      <Container className="max-w-[1280px]">
        <EcommerceTrustFaq dictionary={dictionary.trustFaq} />
        <EcommerceFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
