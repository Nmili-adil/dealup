import { Check, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ChatBubble } from "@/components/product/chat-bubble";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function CsAi({
  dictionary,
}: {
  dictionary: Dictionary["customerSupportSolution"]["ai"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="cs-ai-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <MotionReveal delay={0.12}>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex items-center gap-2 border-b border-border bg-linear-to-b from-white to-ai/5 px-5 py-3.5">
              <span className="grid size-7 place-items-center rounded-lg bg-ai/15 text-ai-dark">
                <Sparkles className="size-4" aria-hidden="true" />
              </span>
              <p className="text-sm font-semibold text-text-primary">{dictionary.windowTitle}</p>
            </div>

            <div className="flex flex-col gap-3 p-5">
              {dictionary.messages.map((message) => (
                <ChatBubble key={message.text} from={message.from === "agent" ? "agent" : "customer"}>
                  {message.text}
                </ChatBubble>
              ))}
              <div className="flex items-center gap-2 rounded-xl bg-ai/8 px-4 py-3 text-sm text-ai-dark">
                <Sparkles className="size-4 shrink-0 text-ai" aria-hidden="true" />
                {dictionary.suggestionNote}
              </div>
            </div>
          </div>
        </MotionReveal>

        <div className="flex flex-col gap-8">
          <SectionHeader
            id="cs-ai-title"
            eyebrow={dictionary.eyebrow}
            headline={dictionary.title}
            description={dictionary.description}
            align="start"
          />

          <MotionReveal delay={0.2}>
            <ul className="space-y-3">
              {dictionary.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
