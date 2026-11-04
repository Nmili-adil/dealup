import { Check, Eye, MousePointerClick, Send, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { CampaignChart } from "@/components/product/campaign-chart";
import { MetricCard } from "@/components/product/metric-card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const metricIcons = [Send, Eye, MousePointerClick, TrendingUp];

export function MarketingAnalytics({
  dictionary,
}: {
  dictionary: Dictionary["marketingSolution"]["analytics"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="marketing-analytics-title">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <SectionHeader
          id="marketing-analytics-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-5 py-3.5">
              <p className="text-sm font-semibold text-text-primary">{dictionary.windowTitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:gap-3.5">
              {dictionary.metricLabels.map((label, index) => {
                const Icon = metricIcons[index];
                const values = ["2,438", "1,925", "640", "18.4%"];
                const trends = ["+12%", "+9%", "+18%", undefined];
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
                points={[21, 34, 30, 52, 47, 68]}
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