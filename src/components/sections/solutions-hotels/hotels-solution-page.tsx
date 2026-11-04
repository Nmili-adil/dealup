import { FeatureFaq } from "@/components/feature-page/feature-faq";
import { FeatureProblem } from "@/components/feature-page/feature-problem";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { HtHero } from "./ht-hero";
import { HtTrust } from "./ht-trust";
import { HtJourney } from "./ht-journey";
import { HtInbox } from "./ht-inbox";
import { HtAi } from "./ht-ai";
import { HtRouting } from "./ht-routing";
import { HtAnalytics } from "./ht-analytics";
import { HtPlaybooks } from "./ht-playbooks";
import { HtFinalCta } from "./ht-final-cta";

type Copy = Dictionary["hotelsSolution"];

/**
 * The WhatsApp Hotels & Hospitality solution page.
 *
 * Follows the guest lifecycle that Dealup enables — booking, arrival, stay,
 * post-stay — with shared trust, problem, journey, FAQ and final-CTA
 * beats used across solution pages.
 */
export function HotelsSolutionPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <HtHero locale={locale} dictionary={dictionary.hero} />
      <HtTrust dictionary={dictionary.trust} />
      <FeatureProblem copy={dictionary.problem} />
      <HtJourney dictionary={dictionary.journey} />
      <HtInbox dictionary={dictionary.inbox} />
      <HtAi dictionary={dictionary.ai} />
      <HtRouting dictionary={dictionary.routing} />
      <HtAnalytics dictionary={dictionary.analytics} />
      <HtPlaybooks dictionary={dictionary.playbooks} />

      <FeatureFaq copy={dictionary.faq} />

      <Container className="max-w-[1280px] pb-16">
        <HtFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
