import { Check, CalendarClock, FileText, PackagePlus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ChatBubble } from "@/components/product/chat-bubble";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function SalesQuotes({
  dictionary,
}: {
  dictionary: Dictionary["salesSolution"]["quotes"];
}) {
  return (
    <Section tone="light" spacing="lg" aria-labelledby="sales-quotes-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="sales-quotes-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex flex-col gap-2.5 bg-neutral-950 p-3.5">
              <ChatBubble from="agent">
                <span className="flex items-center gap-2 font-semibold">
                  <FileText className="size-4 text-brand" aria-hidden="true" />
                  {dictionary.quoteTitle}
                </span>
              </ChatBubble>
              <div className="rounded-2xl rounded-tr-sm bg-[#d7f6c6] px-4 py-3">
                <dl className="space-y-1.5">
                  {dictionary.quoteLines.map((line) => (
                    <div key={line.label} className="flex items-center justify-between gap-3">
                      <dt className="text-xs font-medium text-black/55">{line.label}</dt>
                      <dd className="text-xs font-semibold text-black/85" dir="auto">
                        {line.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2.5 border-t border-black/12 pt-2.5 text-lg font-bold tabular-nums text-black/90">
                  {dictionary.quoteTotal}
                </p>
                <span className="mt-2 inline-flex rounded-full bg-black px-3 py-1.5 text-[11px] font-semibold text-white">
                  WhatsApp Pay
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4">
              <div className="rounded-2xl border border-border bg-white p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-text-secondary">
                  <PackagePlus className="size-3.5 text-brand-hover" aria-hidden="true" />
                  {dictionary.catalogTitle}
                </p>
                <ul className="mt-2 space-y-2">
                  {dictionary.catalogItems.map((item) => (
                    <li key={item.name}>
                      <p className="truncate text-xs font-semibold text-text-primary">{item.name}</p>
                      <p className="text-[11px] text-text-secondary" dir="auto">
                        {item.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-white p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-text-secondary">
                  <CalendarClock className="size-3.5 text-brand-hover" aria-hidden="true" />
                  {dictionary.bookingTitle}
                </p>
                <p className="mt-2 text-xs leading-5 text-text-primary" dir="auto">
                  {dictionary.bookingValue}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-1 text-[10px] font-semibold text-brand-hover">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  Synced
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