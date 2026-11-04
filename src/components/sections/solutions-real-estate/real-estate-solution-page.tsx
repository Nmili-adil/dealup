import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { RealEstateAutomation } from "./real-estate-automation";
import { RealEstateDiscovery } from "./real-estate-discovery";
import { RealEstateFinalCta } from "./real-estate-final-cta";
import { RealEstateGrowth } from "./real-estate-growth";
import { RealEstateHero } from "./real-estate-hero";
import { RealEstateJourney } from "./real-estate-journey";
import { RealEstatePlaybooks } from "./real-estate-playbooks";
import { RealEstateQualification } from "./real-estate-qualification";
import { RealEstateTeam } from "./real-estate-team";
import { RealEstateTrustFaq } from "./real-estate-trust-faq";

type Copy = Dictionary["realEstateSolution"];

export function RealEstateSolutionPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <RealEstateHero locale={locale} dictionary={dictionary.hero} />
      <RealEstateJourney dictionary={dictionary.journey} />
      <RealEstateQualification locale={locale} dictionary={dictionary.qualification} />
      <RealEstateDiscovery locale={locale} dictionary={dictionary.discovery} />
      <RealEstateAutomation locale={locale} dictionary={dictionary.automation} />
      <RealEstateGrowth dictionary={dictionary.growth} />
      <RealEstateTeam dictionary={dictionary.team} />
      <RealEstatePlaybooks dictionary={dictionary.playbooks} />

      <Container className="max-w-[1280px]">
        <RealEstateTrustFaq dictionary={dictionary.trustFaq} />
        <RealEstateFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
