import { Check, Route, Zap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function CsRouting({
  dictionary,
}: {
  dictionary: Dictionary["customerSupportSolution"]["routing"];
}) {
  return (
    <Section tone="mint" spacing="lg" aria-labelledby="cs-routing-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="cs-routing-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex items-center gap-2 border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-5 py-3.5">
              <Route className="size-4 text-brand-hover" aria-hidden="true" />
              <p className="text-sm font-semibold text-text-primary">{dictionary.windowTitle}</p>
            </div>

            <div className="space-y-0">
              {dictionary.rules.map((rule, index) => (
                <div
                  key={rule.label}
                  className="flex items-center gap-3 border-b border-border/70 px-5 py-3.5 last:border-b-0"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-mint text-brand-hover">
                    <Zap className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-primary">{rule.label}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{rule.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand-hover">
                    {rule.badge}
                  </span>
                </div>
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
