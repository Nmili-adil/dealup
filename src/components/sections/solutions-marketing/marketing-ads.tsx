import { Check, MessageCircleMore } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ChatBubble } from "@/components/product/chat-bubble";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function MarketingAds({
  dictionary,
}: {
  dictionary: Dictionary["marketingSolution"]["ads"];
}) {
  return (
    <Section tone="light" spacing="lg" aria-labelledby="marketing-ads-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="marketing-ads-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="mx-auto w-full max-w-[420px]">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
              <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                  <MessageCircleMore className="size-3.5 text-brand-hover" aria-hidden="true" />
                  {dictionary.adEyebrow}
                </span>
              </div>

              <div className="relative h-32 bg-gradient-to-br from-brand/15 via-surface-mint to-[#e7b873]/25">
                <span aria-hidden="true" className="absolute inset-0 bg-grid-faint mask-fade-edges" />
                <p className="absolute inset-x-0 bottom-3 px-4 text-center text-sm font-semibold text-brand-dark">
                  {dictionary.adHeadline}
                </p>
              </div>

              <p className="px-4 pt-3 text-sm leading-6 text-text-secondary">{dictionary.adBody}</p>

              <div className="px-4 py-3">
                <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white shadow-brand">
                  <MessageCircleMore className="size-4" aria-hidden="true" />
                  {dictionary.adCta}
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <ChatBubble from="customer" className="max-w-[300px]">
                {dictionary.ctaNote}
              </ChatBubble>
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