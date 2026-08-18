import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function CustomerStory({ dictionary }: { dictionary: Dictionary["customerStory"] }) {
  return (
    <Section tone="mint">
      <Container>
        <MotionReveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <SectionHeader align="center" eyebrow={dictionary.eyebrow} headline={dictionary.headline} />
          <p className="text-text-secondary">{dictionary.placeholderNote}</p>
        </MotionReveal>
      </Container>
    </Section>
  );
}
