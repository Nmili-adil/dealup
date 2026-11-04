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
    <Section tone="mint" decoration="glow">
      <Container className="flex flex-col items-center gap-14">
        <SectionHeader
          align="center"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.headline}
          description={dictionary.description}
        />

        <MotionReveal className="w-full max-w-lg">
          <div className="flex flex-col items-center rounded-3xl border border-border/70 bg-white/70 p-8 shadow-e2 backdrop-blur-sm">
            <WorkflowNode icon={Zap} label={workflow.trigger} />
            <WorkflowConnector />
            <WorkflowNode icon={Sparkles} label={workflow.step} tone="brand" />
            <WorkflowConnector />
            <span className="rounded-full bg-surface-mint px-3 py-1 text-xs font-semibold text-brand-hover">
              {workflow.scoreLabel}
            </span>
            <WorkflowConnector direction="split" />

            <div className="grid w-full grid-cols-2 gap-6 pt-2 sm:gap-8">
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
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
