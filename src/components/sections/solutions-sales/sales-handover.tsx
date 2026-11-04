import { Check, Handshake, UserCheck, UserPlus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ChatBubble } from "@/components/product/chat-bubble";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function SalesHandover({
  dictionary,
}: {
  dictionary: Dictionary["salesSolution"]["handover"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="sales-handover-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="sales-handover-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex items-center justify-between gap-2 border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <UserCheck className="size-4 text-brand-hover" aria-hidden="true" />
                {dictionary.chatTitle}
              </p>
              <span className="rounded-full bg-ai/10 px-2.5 py-1 text-[11px] font-semibold text-ai-dark">
                AI → Human
              </span>
            </div>

            <div className="flex flex-col gap-2.5 p-4">
              <div className="rounded-xl border border-ai/25 bg-ai/6 px-4 py-3">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ai-dark">
                  <Handshake className="size-3.5 text-ai" aria-hidden="true" />
                  {dictionary.prevTitle}
                </p>
                <p className="mt-1.5 text-xs leading-5 text-text-secondary">{dictionary.prevSummary}</p>
              </div>

              <div className="flex justify-center">
                <span className="rounded-full border border-border/70 bg-surface-mint/50 px-3 py-1.5 text-[11px] font-medium text-text-secondary">
                  {dictionary.agentName} <span className="text-text-primary">{dictionary.joinedTitle}</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-dark text-xs font-semibold text-white">
                  SA
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-text-primary">{dictionary.agentName}</span>
                  <span className="flex items-center gap-1 text-[11px] text-text-secondary">
                    <UserPlus className="size-3 text-brand-hover" aria-hidden="true" />
                    {dictionary.agentRole}
                  </span>
                </span>
              </div>

              <ChatBubble from="agent">{dictionary.agentReply}</ChatBubble>
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