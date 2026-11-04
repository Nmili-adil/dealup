import { Check, Flame, Gauge, Snowflake } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { WorkflowConnector, WorkflowNode } from "@/components/product/workflow-node";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function SalesScoring({
  dictionary,
}: {
  dictionary: Dictionary["salesSolution"]["scoring"];
}) {
  return (
    <Section tone="light" spacing="lg" aria-labelledby="sales-scoring-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="sales-scoring-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex items-center justify-between gap-2 border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <Gauge className="size-4 text-brand-hover" aria-hidden="true" />
                {dictionary.panelTitle}
              </p>
              <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand-hover">
                {dictionary.scoreLabel}
              </span>
            </div>

            <div className="p-4">
              <div className="flex items-end justify-between gap-3">
                <span className="text-5xl font-semibold tabular-nums leading-none text-text-primary">
                  {dictionary.scoreValue}
                </span>
                <span className="pb-1 text-xs leading-5 text-text-secondary">{dictionary.scoreNote}</span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-border/70">
                <div
                  className="h-full rounded-full bg-linear-to-r from-brand-hover to-brand"
                  style={{ width: `${Math.min(100, Number(dictionary.scoreValue))}%` }}
                />
              </div>

              <div className="mt-5 flex flex-col items-stretch gap-2">
                <WorkflowNode icon={Flame} label={`${dictionary.hot} — ${dictionary.hotAction}`} tone="hot" className="w-full justify-center" />
                <WorkflowConnector direction="split" />
                <WorkflowNode icon={Snowflake} label={`${dictionary.cold} — ${dictionary.coldAction}`} tone="cold" className="w-full justify-center" />
              </div>
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