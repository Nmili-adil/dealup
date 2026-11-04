import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { BlueTickBenefits } from "./blue-tick-benefits";
import { BlueTickFaq } from "./blue-tick-faq";
import { BlueTickFinalCta } from "./blue-tick-final-cta";
import { BlueTickHero } from "./blue-tick-hero";
import { BlueTickIndustries } from "./blue-tick-industries";
import { BlueTickOverview } from "./blue-tick-overview";
import { BlueTickProcess } from "./blue-tick-process";
import { BlueTickRequirements } from "./blue-tick-requirements";

type Copy = Dictionary["whatsappBlueTick"];

export function WhatsAppBlueTickPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <BlueTickHero locale={locale} dictionary={dictionary.hero} />
      <BlueTickOverview dictionary={dictionary.overview} />
      <BlueTickBenefits dictionary={dictionary.benefits} />

      <Container className="max-w-[1280px]">
        <BlueTickRequirements dictionary={dictionary.requirements} />
        <BlueTickProcess locale={locale} dictionary={dictionary.process} />
      </Container>

      <BlueTickIndustries dictionary={dictionary.industries} />

      <Container className="max-w-[1280px]">
        <BlueTickFaq dictionary={dictionary.faq} />
        <BlueTickFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
