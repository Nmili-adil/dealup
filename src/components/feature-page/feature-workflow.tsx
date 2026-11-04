import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { SectionHeader } from "@/components/layout/section-header";
import type { FeatureWorkflowCopy } from "./copy";

/**
 * Linear step timeline for "how it works". Forest band for contrast on the
 * page; a horizontal connector runs between steps on wide screens and a
 * vertical one on mobile. Steps render as plain <ol>, so the counting stays
 * in the DOM for screen readers.
 */
export function FeatureWorkflow({ copy }: { copy: FeatureWorkflowCopy }) {
  return (
    <Section tone="forest" spacing="lg" aria-labelledby="feature-workflow-title">
      <Container>
        <SectionHeader
          id="feature-workflow-title"
          eyebrow={copy.eyebrow}
          headline={copy.title}
          description={copy.description}
          align="center"
          tone="inverted"
        />

        <ol className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <MotionReveal delay={index * 0.06}>
                <div className="relative h-full rounded-2xl border border-white/12 bg-white/6 p-6 backdrop-blur-sm">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-full bg-brand font-mono text-sm font-semibold text-white"
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{step.description}</p>
                </div>
              </MotionReveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
