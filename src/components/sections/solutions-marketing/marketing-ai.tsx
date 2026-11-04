import { Check, Sparkles, WandSparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function MarketingAi({
  dictionary,
}: {
  dictionary: Dictionary["marketingSolution"]["ai"];
}) {
  return (
    <Section tone="violet" spacing="lg" decoration="grid" aria-labelledby="marketing-ai-title">
      <Container className="max-w-[1280px]">
        <SectionHeader
          id="marketing-ai-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="center"
          tone="ai"
        />

        <MotionReveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-[720px]">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ai-on-dark">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {dictionary.previewEyebrow}
                </p>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-ai-on-dark">
                  {dictionary.previewTitle}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {dictionary.suggestions.map((suggestion) => (
                  <div
                    key={suggestion.label}
                    className="flex items-start gap-3 rounded-xl border border-white/12 bg-white/5 px-4 py-3"
                  >
                    <span className="mt-0.5 shrink-0 rounded-md bg-ai/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ai-on-dark">
                      {suggestion.label}
                    </span>
                    <span className="flex-1 text-sm leading-6 text-white/80">{suggestion.body}</span>
                    <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ai px-3 py-1 text-[11px] font-semibold text-white">
                      <WandSparkles className="size-3" aria-hidden="true" />
                      {dictionary.insertLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.2}>
          <ul className="mx-auto mt-10 grid max-w-[900px] gap-3 sm:grid-cols-3">
            {dictionary.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm leading-6 text-white/80"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-[#8ef0b5]" strokeWidth={2.4} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Container>
    </Section>
  );
}