import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { SectionHeader } from "@/components/layout/section-header";
import type { FeatureUseCasesCopy } from "./copy";

/**
 * Concrete use cases as a bento-ish grid: first item spans two columns on
 * desktop for hierarchy, the rest flow beneath. Not a uniform card wall.
 */
export function FeatureUseCases({ copy }: { copy: FeatureUseCasesCopy }) {
  const [first, ...rest] = copy.items;
  return (
    <Section tone="white" spacing="lg" aria-labelledby="feature-use-cases-title">
      <Container>
        <SectionHeader
          id="feature-use-cases-title"
          eyebrow={copy.eyebrow}
          headline={copy.title}
          description={copy.description}
          align="center"
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {first ? (
            <MotionReveal className="sm:col-span-2 lg:col-span-3">
              <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-surface-mint/70 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{first.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-text-secondary">
                    {first.description}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden h-10 w-0.5 rounded-full bg-brand/40 sm:block"
                />
              </div>
            </MotionReveal>
          ) : null}

          {rest.map((item, index) => (
            <MotionReveal key={item.title} delay={(index % 3) * 0.06}>
              <div className="h-full rounded-2xl border border-border/80 bg-white p-5 shadow-e1 transition-colors duration-300 hover:border-brand/30">
                <h3 className="text-base font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-text-secondary">{item.description}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
