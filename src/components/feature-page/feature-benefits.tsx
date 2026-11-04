import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { SectionHeader } from "@/components/layout/section-header";
import type { FeatureBenefitsCopy } from "./copy";

/**
 * Three benefits in open composition — icon tile + title + description, no
 * borders between them, so the section breathes instead of card-stacking.
 */
export function FeatureBenefits({ copy }: { copy: FeatureBenefitsCopy }) {
  return (
    <Section spacing="md" aria-labelledby="feature-benefits-title">
      <Container>
        <SectionHeader id="feature-benefits-title" eyebrow={copy.eyebrow} headline={copy.title} description={copy.description} align="center" />
        <div className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {copy.items.map((item, index) => (
            <MotionReveal key={item.title} delay={index * 0.07}>
              <div className="flex flex-col items-start gap-3 text-start">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-brand shadow-e1" />
                <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="text-sm leading-6 text-text-secondary">{item.description}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
