import { FeatureFaq } from "@/components/feature-page/feature-faq";
import { FeatureProblem } from "@/components/feature-page/feature-problem";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { MarketingAds } from "./marketing-ads";
import { MarketingAi } from "./marketing-ai";
import { MarketingAnalytics } from "./marketing-analytics";
import { MarketingBuilder } from "./marketing-builder";
import { MarketingDrip } from "./marketing-drip";
import { MarketingFinalCta } from "./marketing-final-cta";
import { MarketingForms } from "./marketing-forms";
import { MarketingHero } from "./marketing-hero";
import { MarketingInbox } from "./marketing-inbox";
import { MarketingIntegrations } from "./marketing-integrations";
import { MarketingJourney } from "./marketing-journey";
import { MarketingPersonalization } from "./marketing-personalization";
import { MarketingPlaybooks } from "./marketing-playbooks";
import { MarketingRetargeting } from "./marketing-retargeting";
import { MarketingSegmentation } from "./marketing-segmentation";
import { MarketingTrust } from "./marketing-trust";

type Copy = Dictionary["marketingSolution"];

export function MarketingSolutionPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <MarketingHero locale={locale} dictionary={dictionary.hero} />
      <MarketingTrust dictionary={dictionary.trust} />
      <FeatureProblem copy={dictionary.problem} />
      <MarketingBuilder dictionary={dictionary.builder} />
      <MarketingSegmentation dictionary={dictionary.segmentation} />
      <MarketingDrip dictionary={dictionary.drip} />
      <MarketingAds dictionary={dictionary.ads} />
      <MarketingForms dictionary={dictionary.forms} />
      <MarketingPersonalization dictionary={dictionary.personalization} />
      <MarketingRetargeting dictionary={dictionary.retargeting} />
      <MarketingAnalytics dictionary={dictionary.analytics} />
      <MarketingInbox dictionary={dictionary.inbox} />
      <MarketingAi dictionary={dictionary.ai} />
      <MarketingIntegrations dictionary={dictionary.integrations} />
      <MarketingPlaybooks dictionary={dictionary.playbooks} />
      <MarketingJourney dictionary={dictionary.journey} />

      <FeatureFaq copy={dictionary.faq} />

      <Container className="max-w-[1280px]">
        <MarketingFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}