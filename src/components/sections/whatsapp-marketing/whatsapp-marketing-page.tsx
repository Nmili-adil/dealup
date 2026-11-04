import { Container } from "@/components/layout/container";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { WmHero } from "./wm-hero";
import { WmWhat } from "./wm-what";
import { WmSteps } from "./wm-steps";
import { WmFeatures } from "./wm-features";
import { WmTouchpoint } from "./wm-touchpoint";
import { WmIndustries } from "./wm-industries";
import { WmOperating } from "./wm-operating";
import { WmAssurances } from "./wm-assurances";
import { WmFinalCta } from "./wm-final-cta";
import { WmFaq } from "./wm-faq";

export function WhatsAppMarketingPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["whatsappMarketing"];
}) {
  return (
    <div className="overflow-hidden bg-white">
      <WmHero locale={locale} dictionary={dictionary.hero} breadcrumb={dictionary.breadcrumb} />
      <WmWhat dictionary={dictionary.what} />

      <Container className="">
        <WmSteps dictionary={dictionary.steps} />
        <WmFeatures dictionary={dictionary.features} />
        <WmTouchpoint dictionary={dictionary.touchpoint} />
        <WmIndustries dictionary={dictionary.industries} />
        <WmOperating
          responsibly={dictionary.responsibly}
          stack={dictionary.stack}
          fees={dictionary.fees}
        />
      </Container>

      <WmAssurances dictionary={dictionary.assurances} />

      <Container className="max-w-[1280px]">
        <WmFinalCta locale={locale} dictionary={dictionary.finalCta} />
        <WmFaq dictionary={dictionary.faq} />
      </Container>
    </div>
  );
}
