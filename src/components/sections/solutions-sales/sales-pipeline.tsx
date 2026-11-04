import { Check, KanbanSquare, Tag, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MetricCard } from "@/components/product/metric-card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Users, Check, Tag];

export function SalesPipeline({
  dictionary,
}: {
  dictionary: Dictionary["salesSolution"]["pipeline"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="sales-pipeline-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="sales-pipeline-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex items-center gap-2 border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-4 py-3">
              <KanbanSquare className="size-4 text-brand-hover" aria-hidden="true" />
              <p className="text-sm font-semibold text-text-primary">{dictionary.panelTitle}</p>
              <span className="ms-auto rounded-full bg-ai/10 px-2.5 py-1 text-[11px] font-semibold text-ai-dark">
                4
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4">
              {dictionary.stages.map((stage, index) => {
                const Icon = icons[index];
                return (
                  <MetricCard
                    key={stage.label}
                    icon={Icon}
                    label={stage.label}
                    value={stage.count}
                    className="!p-3.5"
                  />
                );
              })}
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