import { FeatureFaq } from "@/components/feature-page/feature-faq";
import { FeatureProblem } from "@/components/feature-page/feature-problem";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { CsHero } from "./cs-hero";
import { CsTrust } from "./cs-trust";
import { CsJourney } from "./cs-journey";
import { CsInbox } from "./cs-inbox";
import { CsAi } from "./cs-ai";
import { CsRouting } from "./cs-routing";
import { CsAnalytics } from "./cs-analytics";
import { CsPlaybooks } from "./cs-playbooks";
import { CsFinalCta } from "./cs-final-cta";

type Copy = Dictionary["customerSupportSolution"];

/**
 * The WhatsApp Customer Support solution page.
 *
 * Follows the ticket lifecycle that Dealup enables — receive, route, respond,
 * resolve, measure — with shared trust, problem, journey, FAQ and final-CTA
 * beats used across solution pages.
 */
export function CustomerSupportSolutionPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <CsHero locale={locale} dictionary={dictionary.hero} />
      <CsTrust dictionary={dictionary.trust} />
      <FeatureProblem copy={dictionary.problem} />
      <CsJourney dictionary={dictionary.journey} />
      <CsInbox dictionary={dictionary.inbox} />
      <CsAi dictionary={dictionary.ai} />
      <CsRouting dictionary={dictionary.routing} />
      <CsAnalytics dictionary={dictionary.analytics} />
      <CsPlaybooks dictionary={dictionary.playbooks} />

      <FeatureFaq copy={dictionary.faq} />

      <Container className="max-w-[1280px] pb-16">
        <CsFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
