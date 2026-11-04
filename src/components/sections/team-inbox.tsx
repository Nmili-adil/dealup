import { UserCheck, Tag, History, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { FeatureList } from "@/components/layout/feature-list";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { ChatBubble } from "@/components/product/chat-bubble";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [UserCheck, Tag, History, Users];

const agents = ["Sara B.", "Yassine K.", "Imane R."];

export function TeamInbox({ dictionary }: { dictionary: Dictionary["teamInbox"] }) {
  return (
    <Section tone="forest" decoration="grid">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <MotionReveal x={-24} y={0} className="flex flex-col gap-8">
          <SectionHeader
            tone="inverted"
            eyebrow={dictionary.eyebrow}
            headline={dictionary.headline}
            description={dictionary.description}
          />
          <FeatureList items={dictionary.features} icons={icons} tone="inverted" />
        </MotionReveal>

        <MotionReveal x={24} y={0} delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-e4">
            <div className="flex divide-x divide-border">
              <div className="hidden w-44 flex-col gap-1 bg-surface-mint p-3 sm:flex">
                <span className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                  {dictionary.eyebrow}
                </span>
                {agents.map((name, i) => (
                  <div
                    key={name}
                    className={
                      i === 0
                        ? "flex items-center gap-2 rounded-lg bg-white px-2 py-2 text-xs font-medium text-text-primary shadow-e1"
                        : "flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-text-secondary"
                    }
                  >
                    <span
                      className={
                        i === 0
                          ? "size-2 shrink-0 rounded-full bg-brand"
                          : "size-2 shrink-0 rounded-full bg-border"
                      }
                      aria-hidden="true"
                    />
                    {name}
                  </div>
                ))}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <span className="text-sm font-semibold text-text-primary">Sara B.</span>
                  <Badge variant="brand">{dictionary.demo.assignedBadge}</Badge>
                </div>
                <ChatBubble from="customer">{dictionary.demo.question}</ChatBubble>
                <ChatBubble from="agent">{dictionary.demo.answer}</ChatBubble>
              </div>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
