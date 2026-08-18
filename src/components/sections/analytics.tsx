import { Send, Eye, Reply, TrendingUp, Users2, Megaphone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { MetricCard } from "@/components/product/metric-card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Send, Eye, Reply, TrendingUp, Users2, Megaphone];
const demoValues = ["48.2k", "91%", "34%", "24%", "97%", "12"];

export function Analytics({ dictionary }: { dictionary: Dictionary["analytics"] }) {
  return (
    <Section tone="light">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          align="center"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.headline}
          description={dictionary.description}
        />

        <MotionReveal className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {dictionary.metrics.map((metric, index) => (
            <MetricCard key={metric} icon={icons[index]} label={metric} value={demoValues[index]} />
          ))}
        </MotionReveal>
      </Container>
    </Section>
  );
}
