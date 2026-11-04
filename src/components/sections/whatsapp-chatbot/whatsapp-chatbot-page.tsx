import { Container } from "@/components/layout/container";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { CbHero } from "./cb-hero";
import { CbBenefits } from "./cb-benefits";
import { CbBuilder } from "./cb-builder";
import { CbSteps } from "./cb-steps";
import { CbPanels } from "./cb-panels";
import { CbTriggers } from "./cb-triggers";
import { CbUseCases } from "./cb-use-cases";
import { CbFinalCta } from "./cb-final-cta";
import { CbFaq } from "./cb-faq";

export function WhatsAppChatbotPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["whatsappChatbot"];
}) {
  return (
    <div className="overflow-hidden bg-white">
      <CbHero locale={locale} dictionary={dictionary.hero} announcement={dictionary.announcement} />

      <Container className="max-w-[1280px]">
        <CbBenefits dictionary={dictionary.benefits} />
      </Container>

      <CbBuilder dictionary={dictionary.builder} />

      <Container className="max-w-[1280px]">
        <CbSteps dictionary={dictionary.steps} />
        <CbPanels ai={dictionary.ai} handover={dictionary.handover} />
        <CbTriggers dictionary={dictionary.triggers} />
        <CbUseCases dictionary={dictionary.useCases} />
        <CbFinalCta locale={locale} dictionary={dictionary.finalCta} />
        <CbFaq dictionary={dictionary.faq} />
      </Container>
    </div>
  );
}
