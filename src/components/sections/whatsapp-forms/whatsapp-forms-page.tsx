import { Container } from "@/components/layout/container";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { FormsHero } from "./forms-hero";
import { FormsUseCases } from "./forms-use-cases";
import { FormsSpotlight } from "./forms-spotlight";
import { FormsFlow } from "./forms-flow";
import { FormsMobile } from "./forms-mobile";
import { FormsInbox } from "./forms-inbox";
import { FormsLanguages } from "./forms-languages";
import { FormsPrivacy } from "./forms-privacy";
import { FormsFaq } from "./forms-faq";
import { FormsFinalCta } from "./forms-final-cta";

export function WhatsAppFormsPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["whatsappForms"];
}) {
  return (
    <div className="overflow-hidden bg-white">
      <FormsHero
        locale={locale}
        dictionary={dictionary.hero}
        announcement={dictionary.announcement}
      />

      <Container className="max-w-[1280px]">
        <FormsUseCases dictionary={dictionary.useCases} />
      </Container>

      <FormsSpotlight dictionary={dictionary.spotlight} />

      <Container className="max-w-[1280px]">
        <FormsFlow dictionary={dictionary.flow} />
        <FormsMobile dictionary={dictionary.mobile} />
        <FormsInbox dictionary={dictionary.inbox} />
      </Container>

      <FormsLanguages dictionary={dictionary.languages} />

      <Container className="max-w-[1280px]">
        <FormsPrivacy dictionary={dictionary.privacy} />
        <FormsFaq dictionary={dictionary.faq} />
        <FormsFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
