import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { HealthcareAnalytics } from "./healthcare-analytics";
import { HealthcareAutomation } from "./healthcare-automation";
import { HealthcareEngagement } from "./healthcare-engagement";
import { HealthcareFinalCta } from "./healthcare-final-cta";
import { HealthcareGuidance } from "./healthcare-guidance";
import { HealthcareHero } from "./healthcare-hero";
import { HealthcareInbox } from "./healthcare-inbox";
import { HealthcareJourney } from "./healthcare-journey";
import { HealthcarePlaybooks } from "./healthcare-playbooks";
import { HealthcareResults } from "./healthcare-results";
import { HealthcareSafeguards } from "./healthcare-safeguards";
import { HealthcareTrustFaq } from "./healthcare-trust-faq";

type Copy = Dictionary["healthcareSolution"];

export function HealthcareSolutionPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <HealthcareHero locale={locale} dictionary={dictionary.hero} />
      <HealthcareJourney dictionary={dictionary.journey} />
      <HealthcareGuidance locale={locale} dictionary={dictionary.guidance} />
      <HealthcareAutomation locale={locale} dictionary={dictionary.automation} />
      <HealthcareInbox locale={locale} dictionary={dictionary.inbox} />
      <HealthcareEngagement dictionary={dictionary.engagement} />
      <HealthcareResults dictionary={dictionary.results} />
      <HealthcareSafeguards dictionary={dictionary.safeguards} />
      <HealthcareAnalytics dictionary={dictionary.analytics} />
      <HealthcarePlaybooks dictionary={dictionary.playbooks} />

      <Container className="max-w-[1280px]">
        <HealthcareTrustFaq dictionary={dictionary.trustFaq} />
        <HealthcareFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
