import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { AiDealUpFaq } from "./ai-faq";
import { AiDealUpFeatures } from "./ai-features";
import { AiDealUpFinalCta } from "./ai-final-cta";
import { AiDealUpHero } from "./ai-hero";
import { AiDealUpHumanStory } from "./ai-human-story";
import { AiDealUpProblem } from "./ai-problem";
import { AiDealUpUseCases } from "./ai-use-cases";
import { AiDealUpWorkflow } from "./ai-workflow";

type Copy = Dictionary["aiDealUp"];

export function AiDealUpPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Copy;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <AiDealUpHero locale={locale} dictionary={dictionary.hero} />
      <AiDealUpProblem dictionary={dictionary.problem} />
      <AiDealUpFeatures dictionary={dictionary.features} />
      <AiDealUpWorkflow dictionary={dictionary.workflow} />
      <AiDealUpUseCases dictionary={dictionary.useCases} />
      <AiDealUpHumanStory dictionary={dictionary.humanStory} />

      <Container className="max-w-[1280px]">
        <AiDealUpFaq dictionary={dictionary.faq} />
        <AiDealUpFinalCta locale={locale} dictionary={dictionary.finalCta} />
      </Container>
    </div>
  );
}
