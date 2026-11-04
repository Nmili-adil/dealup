import { Container } from "@/components/layout/container";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { AdsHero } from "./ads-hero";
import { AdsWhy } from "./ads-why";
import { AdsTypes } from "./ads-types";
import { AdsDashboard } from "./ads-dashboard";
import { AdsSteps } from "./ads-steps";
import { AdsCreative } from "./ads-creative";
import { AdsCompare } from "./ads-compare";
import { AdsFinalCta } from "./ads-final-cta";
import { AdsFaq } from "./ads-faq";

export function MetaAdsManagerPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["metaAdsManager"];
}) {
  return (
    <div className="overflow-hidden bg-white">
      <AdsHero locale={locale} dictionary={dictionary.hero} />

      <Container className="max-w-[1280px]">
        <AdsWhy dictionary={dictionary.why} />
      </Container>

      <AdsTypes dictionary={dictionary.adTypes} />

      <Container className="max-w-[1280px]">
        <AdsDashboard dictionary={dictionary.dashboard} />
        <AdsSteps dictionary={dictionary.steps} />
        <AdsCreative dictionary={dictionary.creative} />
        <AdsCompare dictionary={dictionary.compare} />
        <AdsFinalCta locale={locale} dictionary={dictionary.finalCta} />
        <AdsFaq dictionary={dictionary.faq} />
      </Container>
    </div>
  );
}
