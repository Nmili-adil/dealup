import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { FinanceInsuranceAnalytics } from "./finance-insurance-analytics";
import { FinanceInsuranceAutomation } from "./finance-insurance-automation";
import { FinanceInsuranceEngagement } from "./finance-insurance-engagement";
import { FinanceInsuranceFinalCta } from "./finance-insurance-final-cta";
import { FinanceInsuranceGuidance } from "./finance-insurance-guidance";
import { FinanceInsuranceHero } from "./finance-insurance-hero";
import { FinanceInsuranceInbox } from "./finance-insurance-inbox";
import { FinanceInsuranceJourney } from "./finance-insurance-journey";
import { FinanceInsurancePlaybooks } from "./finance-insurance-playbooks";
import { FinanceInsuranceResults } from "./finance-insurance-results";
import { FinanceInsuranceSafeguards } from "./finance-insurance-safeguards";
import { FinanceInsuranceTrustFaq } from "./finance-insurance-trust-faq";

type Copy = Dictionary["financeInsuranceSolution"];

export function FinanceInsuranceSolutionPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <FinanceInsuranceHero locale={locale} dictionary={dictionary.hero} />
      <FinanceInsuranceJourney dictionary={dictionary.journey} />
      <FinanceInsuranceGuidance locale={locale} dictionary={dictionary.guidance} />
      <FinanceInsuranceAutomation locale={locale} dictionary={dictionary.automation} />
      <FinanceInsuranceInbox locale={locale} dictionary={dictionary.inbox} />
      <FinanceInsuranceEngagement dictionary={dictionary.engagement} />
      <FinanceInsuranceResults dictionary={dictionary.results} />
      <FinanceInsuranceSafeguards dictionary={dictionary.safeguards} />
      <FinanceInsuranceAnalytics dictionary={dictionary.analytics} />
      <FinanceInsurancePlaybooks dictionary={dictionary.playbooks} />

      <Container className="max-w-[1280px]">
        <FinanceInsuranceTrustFaq dictionary={dictionary.trustFaq} />
        <FinanceInsuranceFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
