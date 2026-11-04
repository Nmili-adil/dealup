import { FeatureFaq } from "@/components/feature-page/feature-faq";
import { FeatureProblem } from "@/components/feature-page/feature-problem";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { SalesAds } from "./sales-ads";
import { SalesAi } from "./sales-ai";
import { SalesAnalytics } from "./sales-analytics";
import { SalesCapture } from "./sales-capture";
import { SalesFinalCta } from "./sales-final-cta";
import { SalesFollowups } from "./sales-followups";
import { SalesHandover } from "./sales-handover";
import { SalesHero } from "./sales-hero";
import { SalesInbox } from "./sales-inbox";
import { SalesIntegrations } from "./sales-integrations";
import { SalesJourney } from "./sales-journey";
import { SalesPipeline } from "./sales-pipeline";
import { SalesPlaybooks } from "./sales-playbooks";
import { SalesQualification } from "./sales-qualification";
import { SalesQuotes } from "./sales-quotes";
import { SalesRouting } from "./sales-routing";
import { SalesScoring } from "./sales-scoring";
import { SalesTrust } from "./sales-trust";

type Copy = Dictionary["salesSolution"];

/**
 * The WhatsApp Sales solution page.
 *
 * The page follows the deal flow that Dealup makes possible — capture, qualify,
 * route, inbox, follow-up, close, measure — with the shared trust, problem,
 * journey, FAQ and final-CTA beats used across solution pages. Every section
 * renders from `salesSolution` copy in the active locale; the visuals are
 * in-code product mockups, so the page stays fully static at export time.
 */
export function SalesSolutionPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <SalesHero locale={locale} dictionary={dictionary.hero} />
      <SalesTrust dictionary={dictionary.trust} />
      <FeatureProblem copy={dictionary.problem} />
      <SalesAds dictionary={dictionary.ads} />
      <SalesCapture dictionary={dictionary.capture} />
      <SalesQualification dictionary={dictionary.qualification} />
      <SalesScoring dictionary={dictionary.scoring} />
      <SalesRouting dictionary={dictionary.routing} />
      <SalesInbox dictionary={dictionary.inbox} />
      <SalesFollowups dictionary={dictionary.followups} />
      <SalesPipeline dictionary={dictionary.pipeline} />
      <SalesQuotes dictionary={dictionary.quotes} />
      <SalesHandover dictionary={dictionary.handover} />
      <SalesAi dictionary={dictionary.ai} />
      <SalesIntegrations dictionary={dictionary.integrations} />
      <SalesAnalytics dictionary={dictionary.analytics} />
      <SalesPlaybooks dictionary={dictionary.playbooks} />
      <SalesJourney dictionary={dictionary.journey} />

      <FeatureFaq copy={dictionary.faq} />

      <Container className="max-w-[1280px] pb-16">
        <SalesFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}