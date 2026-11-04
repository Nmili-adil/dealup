import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function AdsSteps({
  dictionary,
}: {
  dictionary: Dictionary["metaAdsManager"]["steps"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="ads-steps-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="ads-steps-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          <GradientText>{dictionary.title}</GradientText>
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.subtitle}</p>
      </div>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dictionary.items.map((step, index) => (
          <li key={step.title}>
            <MotionReveal delay={index * 0.05}>
              <div className="flex h-full gap-3.5 rounded-2xl border border-border/80 bg-white p-5 shadow-e1">
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-dark text-sm font-semibold tabular-nums text-white"
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold leading-snug text-text-primary">
                    <GradientText>{step.title}</GradientText>
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-text-secondary">{step.description}</p>
                </div>
              </div>
            </MotionReveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
