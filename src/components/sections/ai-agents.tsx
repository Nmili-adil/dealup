import { MessageCircleQuestion, UserSearch, Reply, FileText } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { FeatureList } from "@/components/layout/feature-list";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { ChatBubble } from "@/components/product/chat-bubble";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [MessageCircleQuestion, UserSearch, Reply, FileText];

export function AiAgents({
  dictionary,
  productUi,
}: {
  dictionary: Dictionary["aiAgents"];
  productUi: Dictionary["productUi"];
}) {
  return (
    <Section tone="violet" decoration="grid">
      {/* AI-purple bloom keeps this section distinct from the forest ones. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 -z-10 size-[420px] rounded-full bg-ai/20 blur-3xl"
      />

      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <MotionReveal x={-24} y={0} className="flex flex-col gap-8">
          <SectionHeader
            tone="ai"
            eyebrow={dictionary.eyebrow}
            headline={dictionary.headline}
            description={dictionary.description}
          />
          <FeatureList items={dictionary.capabilities} icons={icons} tone="ai" />
        </MotionReveal>

        <MotionReveal x={24} y={0} delay={0.1}>
          <div className="flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/6 p-6 shadow-e4 backdrop-blur">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {dictionary.demo.customerLabel}
            </span>
            <ChatBubble from="customer">{productUi.stockQuestion}</ChatBubble>

            <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/60">
              {dictionary.demo.aiLabel}
            </span>
            <ChatBubble from="ai">{productUi.aiStockSuggestion}</ChatBubble>

            <dl className="mt-2 grid grid-cols-2 gap-4 border-t border-white/12 pt-4 text-sm">
              <div>
                <dt className="text-xs text-white/60">{dictionary.demo.intentLabel}</dt>
                <dd className="mt-0.5 font-medium text-white">{productUi.intentValue}</dd>
              </div>
              <div>
                <dt className="text-xs text-white/60">{dictionary.demo.confidenceLabel}</dt>
                <dd className="mt-0.5 font-medium tabular-nums text-white">92%</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-white/60">{dictionary.demo.nextActionLabel}</dt>
                <dd className="mt-0.5 font-medium text-white">{productUi.nextActionValue}</dd>
              </div>
            </dl>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
