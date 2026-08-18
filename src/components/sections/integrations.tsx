import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Integrations({ dictionary }: { dictionary: Dictionary["integrations"] }) {
  return (
    <Section tone="light">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          align="center"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.headline}
          description={dictionary.description}
        />

        <MotionReveal className="flex flex-wrap items-center justify-center gap-3">
          {dictionary.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
            >
              {item}
            </span>
          ))}
        </MotionReveal>
      </Container>
    </Section>
  );
}
