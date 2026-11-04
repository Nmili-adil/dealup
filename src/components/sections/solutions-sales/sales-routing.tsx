import { Check, Route } from "lucide-react";
import { Mockup } from "@/components/product/mockup";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function SalesRouting({
  dictionary,
}: {
  dictionary: Dictionary["salesSolution"]["routing"];
}) {
  return (
    <Section tone="mint" spacing="lg" aria-labelledby="sales-routing-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="sales-routing-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex items-center gap-2 border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-4 py-3">
              <Route className="size-4 text-brand-hover" aria-hidden="true" />
              <p className="text-sm font-semibold text-text-primary">{dictionary.panelTitle}</p>
            </div>

            <div className="divide-y divide-border/70">
              {dictionary.rules.map((rule) => (
                <div key={rule.label} className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <span className="text-sm font-semibold text-text-primary">{rule.label}</span>
                  <span className="text-xs leading-5 text-text-secondary sm:text-end">{rule.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 border-t border-border bg-surface-mint/50 px-4 py-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-dark text-xs font-semibold text-white">
                SA
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-text-primary">
                  {dictionary.assignedTitle}
                </span>
                <span className="block text-xs font-semibold text-brand-hover">{dictionary.assignedName}</span>
              </span>
              <span className="truncate text-[11px] text-text-secondary">{dictionary.assignedMeta}</span>
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

        <MotionReveal delay={0.26}>
          <Mockup
            name="sales-team"
            alt={dictionary.imageAlt}
            ratio="12 / 5"
            sizes="(max-width: 1280px) 94vw, 1180px"
            className="mt-10 rounded-2xl shadow-e2 lg:col-span-2"
          />
        </MotionReveal>
      </Container>
    </Section>
  );
}