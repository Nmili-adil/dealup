import { UserCheck, Tag, History, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { ChatBubble } from "@/components/product/chat-bubble";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [UserCheck, Tag, History, Users];

export function TeamInbox({ dictionary }: { dictionary: Dictionary["teamInbox"] }) {
  return (
    <Section tone="forest">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeader
            tone="inverted"
            eyebrow={dictionary.eyebrow}
            headline={dictionary.headline}
            description={dictionary.description}
          />
          <ul className="grid gap-5 sm:grid-cols-2">
            {dictionary.features.map((feature, index) => {
              const Icon = icons[index];
              return (
                <li key={feature.title} className="flex flex-col gap-2">
                  <Icon className="size-5 text-brand" aria-hidden="true" />
                  <span className="font-medium text-white">{feature.title}</span>
                  <span className="text-sm text-white/60">{feature.description}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <MotionReveal>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
            <div className="flex divide-x divide-border">
              <div className="hidden w-40 flex-col gap-2 bg-surface-mint p-3 sm:flex">
                {["Sara B.", "Yassine K.", "Imane R."].map((name, i) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-text-primary"
                  >
                    <span className={i === 0 ? "size-2 rounded-full bg-brand" : "size-2 rounded-full bg-border"} />
                    {name}
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
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
