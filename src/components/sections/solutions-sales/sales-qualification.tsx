import { Check, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ChatBubble } from "@/components/product/chat-bubble";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function SalesQualification({
  dictionary,
}: {
  dictionary: Dictionary["salesSolution"]["qualification"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="sales-qualification-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="sales-qualification-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex items-center justify-between gap-2 border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-4 py-3">
              <span className="text-sm font-semibold text-text-primary">{dictionary.chatTitle}</span>
              <span className="rounded-full bg-ai/10 px-2.5 py-1 text-[11px] font-semibold text-ai-dark">
                AI
              </span>
            </div>

            <div className="flex flex-col gap-2.5 p-4">
              {dictionary.messages.map((message) => (
                <ChatBubble key={message.text} from={message.from === "agent" ? "agent" : "customer"}>
                  {message.text}
                </ChatBubble>
              ))}

              <div className="mt-1 flex items-center gap-3 rounded-xl border border-ai/25 bg-ai/6 px-4 py-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ai/15">
                  <Sparkles className="size-4 text-ai" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-ai-dark">{dictionary.decisionTitle}</span>
                  <span className="block text-xs leading-5 text-text-secondary">{dictionary.decisionBody}</span>
                </span>
              </div>
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