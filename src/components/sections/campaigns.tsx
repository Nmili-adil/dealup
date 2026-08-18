import { Users, FileCheck2, CalendarClock, LineChart } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { ProductWindow } from "@/components/product/product-window";
import { MetricCard } from "@/components/product/metric-card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Users, FileCheck2, CalendarClock, LineChart];

export function Campaigns({
  dictionary,
  productUi,
}: {
  dictionary: Dictionary["campaigns"];
  productUi: Dictionary["productUi"];
}) {
  return (
    <Section tone="light">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeader
            eyebrow={dictionary.eyebrow}
            headline={dictionary.headline}
            description={dictionary.description}
          />
          <ul className="grid gap-5 sm:grid-cols-2">
            {dictionary.features.map((feature, index) => {
              const Icon = icons[index];
              return (
                <li key={feature.title} className="flex flex-col gap-2">
                  <Icon className="size-5 text-brand-hover" aria-hidden="true" />
                  <span className="font-medium text-text-primary">{feature.title}</span>
                  <span className="text-sm text-text-secondary">{feature.description}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <MotionReveal>
          <ProductWindow title={productUi.campaignName}>
            <div className="flex flex-col gap-4 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-text-primary">{productUi.activeCustomers}</span>
                <span className="rounded-full bg-surface-mint px-2.5 py-1 text-xs font-medium text-brand-hover">
                  {productUi.scheduled}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-mint">
                <div className="h-full w-3/4 rounded-full bg-brand" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <MetricCard label={productUi.delivered} value="8 210" />
                <MetricCard label={productUi.read} value="91%" />
                <MetricCard label={productUi.converted} value="312" trend="+9%" />
              </div>
            </div>
          </ProductWindow>
        </MotionReveal>
      </Container>
    </Section>
  );
}
