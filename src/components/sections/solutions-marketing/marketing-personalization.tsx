import { Fragment } from "react";
import { AtSign, Check, WandSparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Keywords developers/reviewers look for, so a slight hover shade is fine. */
const TOKEN_PATTERN = /\{\{[^}]+\}\}/g;

export function MarketingPersonalization({
  dictionary,
}: {
  dictionary: Dictionary["marketingSolution"]["personalization"];
}) {
  const { previewBody } = dictionary;
  const parts = previewBody.split(TOKEN_PATTERN);
  const tokens = previewBody.match(TOKEN_PATTERN) ?? [];

  return (
    <Section tone="mint" spacing="lg" aria-labelledby="marketing-personalization-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="marketing-personalization-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="mx-auto w-full max-w-[420px]">
            <div className="rounded-2xl border border-brand/20 bg-white p-5 shadow-e3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-hover">
                {dictionary.previewTitle}
              </p>

              <p className="mt-3 text-sm leading-6 text-text-primary">
                {parts.map((part, index) => (
                  <Fragment key={index}>
                    {part}
                    {tokens[index] ? (
                      <span className="mx-0.5 inline-flex items-baseline gap-1 rounded-md bg-brand/10 px-1.5 py-0.5 text-xs font-semibold text-brand-hover">
                        <AtSign className="inline size-3 self-center" aria-hidden="true" />
                        {tokens[index]}
                      </span>
                    ) : null}
                  </Fragment>
                ))}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {dictionary.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-ai/25 bg-white px-3 py-1.5 text-xs font-semibold text-ai-dark shadow-e1"
                >
                  <WandSparkles className="size-3.5 text-ai" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.2}>
          <ul className="mt-6 space-y-3 lg:col-start-1 lg:row-start-2">
            {dictionary.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Container>
    </Section>
  );
}