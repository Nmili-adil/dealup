import { Send, Tag, Timer, Zap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { WorkflowConnector, WorkflowNode } from "@/components/product/workflow-node";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Zap, Timer, Send, Tag];

export function MarketingDrip({
  dictionary,
}: {
  dictionary: Dictionary["marketingSolution"]["drip"];
}) {
  return (
    <Section tone="forest" spacing="lg" decoration="grid" aria-labelledby="marketing-drip-title">
      <Container className="max-w-[1100px]">
        <SectionHeader
          id="marketing-drip-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="center"
          tone="inverted"
        />

        <MotionReveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-[620px] flex-col items-center">
            {dictionary.nodes.map((label, index) => {
              const Icon = icons[index];
              return (
                <div key={label} className="w-full">
                  <WorkflowNode
                    icon={Icon}
                    label={label}
                    tone={index === 0 ? "brand" : "neutral"}
                    className="w-full justify-center"
                  />
                  {index < dictionary.nodes.length - 1 ? <WorkflowConnector direction="down" /> : null}
                </div>
              );
            })}
          </div>
        </MotionReveal>

        <MotionReveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-6 text-white/70">
            {dictionary.note}
          </p>
        </MotionReveal>
      </Container>
    </Section>
  );
}