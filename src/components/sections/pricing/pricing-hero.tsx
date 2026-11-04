import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { GradientText } from "@/components/ui/titleCustomize";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function PricingHero({
  dictionary,
}: {
  dictionary: Dictionary["pricing"]["hero"];
}) {
  return (
    <Section tone="white" spacing="md" className="pt-14 md:pt-20">
      <Container className="flex flex-col items-center gap-5 text-center">
        <MotionReveal>
          <SectionEyebrow align="center">{dictionary.eyebrow}</SectionEyebrow>
        </MotionReveal>

        <MotionReveal delay={0.06}>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-text-primary sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            {dictionary.headline} <GradientText variant="brand">{dictionary.highlight}</GradientText>
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.12}>
          <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">
            {dictionary.description}
          </p>
        </MotionReveal>
      </Container>
    </Section>
  );
}
