import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { EducationAutomation } from "./education-automation";
import { EducationEngagement } from "./education-engagement";
import { EducationFinalCta } from "./education-final-cta";
import { EducationGuidance } from "./education-guidance";
import { EducationHero } from "./education-hero";
import { EducationInbox } from "./education-inbox";
import { EducationJourney } from "./education-journey";
import { EducationPlaybooks } from "./education-playbooks";
import { EducationSafeguards } from "./education-safeguards";
import { EducationTrustFaq } from "./education-trust-faq";

type Copy = Dictionary["educationSolution"];

export function EducationSolutionPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <EducationHero locale={locale} dictionary={dictionary.hero} />
      <EducationJourney dictionary={dictionary.journey} />
      <EducationGuidance locale={locale} dictionary={dictionary.guidance} />
      <EducationAutomation locale={locale} dictionary={dictionary.automation} />
      <EducationInbox locale={locale} dictionary={dictionary.inbox} />
      <EducationEngagement dictionary={dictionary.engagement} />
      <EducationSafeguards dictionary={dictionary.safeguards} />
      <EducationPlaybooks dictionary={dictionary.playbooks} />

      <Container className="max-w-[1280px]">
        <EducationTrustFaq dictionary={dictionary.trustFaq} />
        <EducationFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
