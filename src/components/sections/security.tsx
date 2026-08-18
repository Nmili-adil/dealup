import { ShieldCheck, KeyRound, Database, Server } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [ShieldCheck, KeyRound, Database, Server];

export function Security({ dictionary }: { dictionary: Dictionary["security"] }) {
  return (
    <Section tone="light">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={dictionary.eyebrow} headline={dictionary.headline} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dictionary.points.map((point, index) => {
            const Icon = icons[index];
            return (
              <MotionReveal key={point.title} delay={index * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-6">
                  <Icon className="size-6 text-brand-hover" aria-hidden="true" />
                  <h3 className="font-semibold text-text-primary">{point.title}</h3>
                  <p className="text-sm text-text-secondary">{point.description}</p>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
