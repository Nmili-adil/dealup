import { FeatureFaq } from "@/components/feature-page/feature-faq";
import { FeatureProblem } from "@/components/feature-page/feature-problem";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { AgHero } from "./ag-hero";
import { AgTrust } from "./ag-trust";
import { AgJourney } from "./ag-journey";
import { AgInbox } from "./ag-inbox";
import { AgAi } from "./ag-ai";
import { AgRouting } from "./ag-routing";
import { AgAnalytics } from "./ag-analytics";
import { AgPlaybooks } from "./ag-playbooks";
import { AgFinalCta } from "./ag-final-cta";

type Copy = Dictionary["agenciesSolution"];

/**
 * The WhatsApp Agencies solution page.
 *
 * Follows the agency workflow that Dealup enables — onboard clients,
 * build campaigns, launch, measure and scale — with shared trust,
 * problem, journey, FAQ and final-CTA beats.
 */
export function AgenciesSolutionPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <AgHero locale={locale} dictionary={dictionary.hero} />
      <AgTrust dictionary={dictionary.trust} />
      <FeatureProblem copy={dictionary.problem} />
      <AgJourney dictionary={dictionary.journey} />
      <AgInbox dictionary={dictionary.inbox} />
      <AgAi dictionary={dictionary.ai} />
      <AgRouting dictionary={dictionary.routing} />
      <AgAnalytics dictionary={dictionary.analytics} />
      <AgPlaybooks dictionary={dictionary.playbooks} />

      <FeatureFaq copy={dictionary.faq} />

      <Container className="max-w-[1280px] pb-16">
        <AgFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
