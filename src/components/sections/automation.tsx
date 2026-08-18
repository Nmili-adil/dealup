import { Zap, Sparkles, Flame, Snowflake, UserCheck2, Repeat2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { WorkflowNode, WorkflowConnector } from "@/components/product/workflow-node";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Automation({ dictionary }: { dictionary: Dictionary["automation"] }) {
  const { workflow } = dictionary;

  return (
    <Section tone="mint">
      <Container className="flex flex-col items-center gap-14">
        <SectionHeader
          align="center"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.headline}
          description={dictionary.description}
        />

        <MotionReveal className="flex w-full max-w-lg flex-col items-center">
          <WorkflowNode icon={Zap} label={workflow.trigger} />
          <WorkflowConnector />
          <WorkflowNode icon={Sparkles} label={workflow.step} tone="brand" />
          <WorkflowConnector />
          <span className="text-xs font-medium text-text-muted">{workflow.scoreLabel}</span>
          <WorkflowConnector direction="split" />
          <div className="grid w-full grid-cols-2 gap-8 pt-2">
            <div className="flex flex-col items-center gap-2">
              <WorkflowNode icon={Flame} label={workflow.hot} tone="hot" />
              <WorkflowConnector />
              <WorkflowNode icon={UserCheck2} label={workflow.hotAction} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <WorkflowNode icon={Snowflake} label={workflow.cold} tone="cold" />
              <WorkflowConnector />
              <WorkflowNode icon={Repeat2} label={workflow.coldAction} />
            </div>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
