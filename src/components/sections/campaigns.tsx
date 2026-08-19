import { Users, FileCheck2, CalendarClock, LineChart, Send, Eye, BarChart3 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { FeatureList } from "@/components/layout/feature-list";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { ProductWindow } from "@/components/product/product-window";
import { MetricCard } from "@/components/product/metric-card";
import { CampaignChart } from "@/components/product/campaign-chart";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import DotsDiv from "../ui/dotsDiv";

const featureIcons = [Users, FileCheck2, CalendarClock, LineChart];

/** Illustrative delivery curve. The final point matches the "Delivered" tile. */
const DELIVERY_BY_DAY = [420, 1500, 3100, 4250, 6800, 7950, 8210];
const CHART_MAX = 9000;
const CHART_TICKS = [
  { value: 0, label: "0" },
  { value: 3000, label: "3k" },
  { value: 6000, label: "6k" },
  { value: 9000, label: "9k" },
];

const DELIVERED_PERCENT = 78;

export function Campaigns({
  dictionary,
}: {
  dictionary: Dictionary["campaigns"];
}) {
  const { panel } = dictionary;

  return (
    <Section tone="white">
      {/* Dotted field in the top corner, as in the reference composition. */}
      <DotsDiv />

      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <MotionReveal x={-24} y={0} className="flex flex-col gap-8">
          <SectionHeader
            eyebrow={dictionary.eyebrow}
            headline={dictionary.headline}
            highlight={dictionary.highlight}
            description={dictionary.description}
          />
          <FeatureList items={dictionary.features} icons={featureIcons} />
        </MotionReveal>

        <MotionReveal x={24} y={0} delay={0.1}>
          <ProductWindow title={panel.title}>
            <div className="flex flex-col gap-4 p-5">
              {/* Audience + live status */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-text-primary">
                  {panel.audience}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-surface-mint px-2.5 py-1 text-[11px] font-medium text-brand-hover">
                  <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
                  {panel.status}
                </span>
              </div>

              {/* Delivery progress */}
              <div className="flex items-center gap-3">
                <div
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-mint"
                  role="progressbar"
                  aria-label={panel.progressLabel}
                  aria-valuenow={DELIVERED_PERCENT}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-linear-to-r from-brand to-brand-hover"
                    style={{ width: `${DELIVERED_PERCENT}%` }}
                  />
                </div>
                <span className="shrink-0 text-[11px] font-medium tabular-nums text-text-secondary">
                  {DELIVERED_PERCENT}%
                </span>
              </div>

              {/* Headline metrics */}
              <div className="grid grid-cols-3 gap-2.5">
                <MetricCard icon={Send} label={panel.delivered} value="8 210" />
                <MetricCard icon={Eye} label={panel.read} value="91%" />
                <MetricCard
                  icon={BarChart3}
                  label={panel.conversions}
                  value="312"
                  trend="24%"
                />
              </div>

              <CampaignChart
                points={DELIVERY_BY_DAY}
                days={panel.days}
                ticks={CHART_TICKS}
                max={CHART_MAX}
                summary={panel.chartSummary}
                className="pt-1"
              />
            </div>
          </ProductWindow>
        </MotionReveal>
      </Container>
    </Section>
  );
}
