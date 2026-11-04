import { Check, Inbox, StickyNote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ChatBubble } from "@/components/product/chat-bubble";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function SalesInbox({
  dictionary,
}: {
  dictionary: Dictionary["salesSolution"]["inbox"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="sales-inbox-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="sales-inbox-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-4 py-3">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
                <Inbox className="size-4 text-brand-hover" aria-hidden="true" />
                {dictionary.headerNote}
              </p>
              <span className="rounded-full bg-ai/10 px-2.5 py-1 text-[11px] font-semibold text-ai-dark">
                +12
              </span>
            </div>

            <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,0.9fr)]">
              {/* Conversation list */}
              <div className="border-e border-border">
                {dictionary.conversations.map((conversation, index) => (
                  <div
                    key={conversation.name}
                    className={
                      index === 0
                        ? "border-b border-border/70 bg-surface-mint/50 px-4 py-3"
                        : "border-b border-border/70 px-4 py-3"
                    }
                  >
                    <p className="text-sm font-semibold text-text-primary">{conversation.name}</p>
                    <p className="mt-0.5 truncate text-xs text-text-secondary">{conversation.preview}</p>
                  </div>
                ))}
              </div>

              {/* Thread */}
              <div className="flex flex-col gap-2.5 p-4">
                {dictionary.messages.map((message) => (
                  <ChatBubble key={message.text} from={message.from === "agent" ? "agent" : "customer"}>
                    {message.text}
                  </ChatBubble>
                ))}
              </div>

              {/* Lead context rail */}
              <div className="border-s border-border bg-surface-mint/20">
                <div className="border-b border-border px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">
                    {dictionary.contextTitle}
                  </p>
                </div>
                <dl className="space-y-0 px-4 py-2">
                  {dictionary.contextRows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-2 border-b border-border/60 py-2 last:border-b-0">
                      <dt className="text-[11px] font-medium text-text-secondary">{row.label}</dt>
                      <dd className="truncate text-xs font-semibold text-text-primary" dir="auto">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mx-4 mb-4 rounded-xl border border-ai/25 bg-white p-3">
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ai-dark">
                    <StickyNote className="size-3.5 text-ai" aria-hidden="true" />
                    {dictionary.noteTitle}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-text-secondary">{dictionary.noteText}</p>
                </div>
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