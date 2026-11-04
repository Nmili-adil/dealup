import { CircleAlert } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { SectionHeader } from "@/components/layout/section-header";
import type { FeatureProblemCopy } from "./copy";

/**
 * "The manual way" — a split section: the headline on the left, a short list
 * of concrete pain points on the right. Kept to one column on long pages.
 */
export function FeatureProblem({ copy }: { copy: FeatureProblemCopy }) {
  return (
    <Section tone="mint" spacing="md" aria-labelledby="feature-problem-title">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <SectionHeader
          id="feature-problem-title"
          eyebrow={copy.eyebrow}
          headline={copy.title}
          description={copy.description}
          align="start"
        />
        <MotionReveal delay={0.1}>
          <ul className="flex flex-col gap-3">
            {copy.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-border/70 bg-white px-4 py-3.5 text-sm leading-6 text-text-secondary shadow-e1"
              >
                <CircleAlert
                  className="mt-0.5 size-4 shrink-0 text-accent-strong"
                  aria-hidden="true"
                  strokeWidth={2}
                />
                {point}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Container>
    </Section>
  );
}
