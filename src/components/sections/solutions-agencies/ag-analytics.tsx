import { BarChart3, Check, Megaphone, Target, TrendingUp, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { CampaignChart } from "@/components/product/campaign-chart";
import { MetricCard } from "@/components/product/metric-card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const metricIcons = [Megaphone, Target, TrendingUp, Users];

export function AgAnalytics({
  dictionary,
}: {
  dictionary: Dictionary["agenciesSolution"]["analytics"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="ag-analytics-title">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <SectionHeader
          id="ag-analytics-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-4 text-brand-hover" aria-hidden="true" />
                <p className="text-sm font-semibold text-text-primary">{dictionary.windowTitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:gap-3.5">
              {dictionary.metricLabels.map((label, index) => {
                const Icon = metricIcons[index];
                const values = ["24.5%", "3.2x", "18K", "89%"];
                const trends = ["+4.2%", "+0.8", "+2.1K", "+12%"];
                return (
                  <MetricCard
                    key={label}
                    icon={Icon}
                    label={label}
                    value={values[index]}
                    trend={trends[index]}
                  />
                );
              })}
            </div>

            <div className="border-t border-border px-5 pb-5 pt-1">
              <CampaignChart
                points={[32, 38, 45, 52, 48, 58]}
                days={dictionary.chartDays}
                ticks={[
                  { value: 0, label: "0" },
                  { value: 50, label: "10K" },
                  { value: 100, label: "20K" },
                ]}
                max={100}
                summary={dictionary.chartSummary}
              />
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
