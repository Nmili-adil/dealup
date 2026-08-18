import { MessageSquareOff, Repeat, TrendingDown } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [MessageSquareOff, Repeat, TrendingDown];

export function Problem({ dictionary }: { dictionary: Dictionary["problem"] }) {
  return (
    <Section tone="mint">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={dictionary.eyebrow} headline={dictionary.headline} />

        <div className="grid gap-6 sm:grid-cols-3">
          {dictionary.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <MotionReveal key={item.title} delay={index * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6">
                  <Icon className="size-6 text-brand-hover" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              </MotionReveal>
            );
          })}
        </div>

        <p className="text-center text-2xl font-semibold text-text-primary">
          {dictionary.transition}
        </p>
      </Container>
    </Section>
  );
}
