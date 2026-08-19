import { ShieldCheck, KeyRound, Database, Server } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Card, IconTile } from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [ShieldCheck, KeyRound, Database, Server];

export function Security({ dictionary }: { dictionary: Dictionary["security"] }) {
  return (
    <Section tone="white">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={dictionary.eyebrow} headline={dictionary.headline} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dictionary.points.map((point, index) => {
            const Icon = icons[index];
            return (
              <MotionReveal key={point.title} delay={index * 0.08} className="h-full">
                <Card interactive padding="lg" className="group h-full gap-4">
                  <IconTile className="group-hover:bg-brand-dark group-hover:text-white">
                    <Icon aria-hidden="true" />
                  </IconTile>
                  <h3 className="font-semibold text-balance text-text-primary">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {point.description}
                  </p>
                </Card>
              </MotionReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
