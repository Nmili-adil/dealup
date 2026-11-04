import { Container } from "@/components/layout/container";
import { DealupProductFlow } from "@/components/product-flow/dealup-product-flow";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { ApiHero } from "./api-hero";
import { ApiBenefits } from "./api-benefits";
import { ApiHowToUse } from "./api-how-to-use";
import { ApiUnlocks } from "./api-unlocks";
import { ApiGrowth } from "./api-growth";
import { ApiIntegrations } from "./api-integrations";
import { ApiSupport } from "./api-support";
import { ApiFaq } from "./api-faq";
import { ApiFinalCta } from "./api-final-cta";

type Copy = Dictionary["whatsappBusinessApi"];

export function WhatsAppBusinessApiPage({
  locale,
  dictionary,
  productFlow,
}: {
  locale: Locale;
  dictionary: Copy;
  productFlow: Dictionary["productFlow"];
}) {
  return (
    <div className="overflow-hidden bg-white">
      <ApiHero locale={locale} dictionary={dictionary.hero} />

      <Container className="space-y-14 py-10 sm:space-y-16 sm:py-12 lg:space-y-2 lg:py-4">
        <ApiBenefits dictionary={dictionary.benefits} />
        <DealupProductFlow copy={productFlow} locale={locale} />
        <ApiHowToUse dictionary={dictionary.howToUse} />
        <ApiUnlocks dictionary={dictionary.unlocks} />
        <ApiGrowth dictionary={dictionary.growth} />
        <ApiIntegrations locale={locale} dictionary={dictionary.integrations} />
        <ApiSupport dictionary={dictionary.support} />
        <ApiFaq dictionary={dictionary.faq} />
        <ApiFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
