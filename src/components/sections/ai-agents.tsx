import { MessageCircleQuestion, UserSearch, Reply, FileText } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
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
    <Section tone="violet">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeader
            tone="ai"
            eyebrow={dictionary.eyebrow}
            headline={dictionary.headline}
            description={dictionary.description}
          />
          <ul className="grid gap-5 sm:grid-cols-2">
            {dictionary.capabilities.map((capability, index) => {
              const Icon = icons[index];
              return (
                <li key={capability.title} className="flex flex-col gap-2">
                  <Icon className="size-5 text-ai" aria-hidden="true" />
                  <span className="font-medium text-white">{capability.title}</span>
                  <span className="text-sm text-white/60">{capability.description}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <MotionReveal>
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <span className="text-xs font-medium uppercase tracking-wide text-white/40">
              {dictionary.demo.customerLabel}
            </span>
            <ChatBubble from="customer">{productUi.stockQuestion}</ChatBubble>

            <span className="mt-2 text-xs font-medium uppercase tracking-wide text-white/40">
              {dictionary.demo.aiLabel}
            </span>
            <ChatBubble from="ai">{productUi.aiStockSuggestion}</ChatBubble>

            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
              <div>
                <span className="block text-xs text-white/40">{dictionary.demo.intentLabel}</span>
                <span className="font-medium text-white">{productUi.intentValue}</span>
              </div>
              <div>
                <span className="block text-xs text-white/40">{dictionary.demo.confidenceLabel}</span>
                <span className="font-medium text-white">92%</span>
              </div>
              <div className="col-span-2">
                <span className="block text-xs text-white/40">{dictionary.demo.nextActionLabel}</span>
                <span className="font-medium text-white">{productUi.nextActionValue}</span>
              </div>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
