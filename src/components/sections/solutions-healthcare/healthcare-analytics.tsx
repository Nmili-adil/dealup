import { BarChart3, CalendarCheck2, Check, MessageCircleMore, MousePointerClick, TrendingUp } from "lucide-react";
import { Mockup } from "@/components/product/mockup";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { CampaignChart } from "@/components/product/campaign-chart";
import { MetricCard } from "@/components/product/metric-card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const metricIcons = [MessageCircleMore, CalendarCheck2, Check, TrendingUp];

export function HealthcareAnalytics({
  dictionary,
}: {
  dictionary: Dictionary["healthcareSolution"]["analytics"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="healthcare-analytics-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="healthcare-analytics-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex items-center justify-between gap-2 border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-5 py-3.5">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
                <BarChart3 className="size-4 text-brand-hover" aria-hidden="true" />
                {dictionary.windowTitle}
              </p>
              <span className="rounded-full bg-ai/10 px-2.5 py-1 text-[11px] font-semibold text-ai-dark">6d</span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:gap-3.5">
              {dictionary.metricLabels.map((label, index) => {
                const Icon = metricIcons[index];
                const values = ["1,248", "416", "338", "289"];
                const trends = ["+14%", "+18%", "+12%", undefined];
                return <MetricCard key={label} icon={Icon} label={label} value={values[index]} trend={trends[index]} />;
              })}
            </div>

            <div className="border-t border-border px-5 pb-5 pt-1">
              <CampaignChart
                points={[34, 42, 51, 47, 62, 71]}
                days={dictionary.chartDays}
                ticks={[
                  { value: 0, label: "0%" },
                  { value: 50, label: "50%" },
                  { value: 100, label: "100%" },
                ]}
                max={100}
                summary={dictionary.chartSummary}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-border px-5 py-4 sm:grid-cols-4">
              {dictionary.sources.map((source) => (
                <div key={source.label} className="rounded-xl border border-border/60 bg-surface-mint/40 px-3 py-2.5">
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-text-secondary">
                    <MousePointerClick className="size-3 text-brand-hover" aria-hidden="true" />
                    {source.label}
                  </p>
                  <p className="mt-1 text-sm font-bold tabular-nums text-text-primary">{source.value}</p>
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

        <MotionReveal delay={0.26}>
          <Mockup
            name="healthcare-analytics"
            alt={dictionary.imageAlt}
            ratio="3 / 2"
            sizes="(max-width: 1280px) 94vw, 1180px"
            className="mt-8 rounded-2xl border border-brand-dark/8 shadow-e2"
          />
        </MotionReveal>
      </Container>
    </Section>
  );
}
