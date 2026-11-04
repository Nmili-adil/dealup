import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { SectionHeader } from "@/components/layout/section-header";
import type { FeatureCapabilitiesCopy } from "./copy";

/**
 * Numbered capability rows with a vertical connector — reads as a product
 * spec rather than a pile of cards. Each capability lists 3 concrete points.
 */
export function FeatureCapabilities({ copy }: { copy: FeatureCapabilitiesCopy }) {
  return (
    <Section tone="mint" spacing="lg" aria-labelledby="feature-capabilities-title">
      <Container className="max-w-[1080px]">
        <SectionHeader
          id="feature-capabilities-title"
          eyebrow={copy.eyebrow}
          headline={copy.title}
          description={copy.description}
          align="center"
        />

        <div className="mt-10 space-y-0">
          {copy.items.map((item, index) => (
            <MotionReveal key={item.title} delay={0.04}>
              <div className="relative grid gap-3 border-t border-border py-7 sm:grid-cols-[64px_minmax(0,1fr)_minmax(0,1fr)] sm:gap-8">
                {index === 0 ? <div className="absolute inset-x-0 top-0 h-px bg-brand" /> : null}
                <div>
                  <span
                    aria-hidden="true"
                    className="font-mono text-2xl font-semibold tracking-tight text-brand/60"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-6 text-text-secondary">
                    {item.description}
                  </p>
                </div>
                <ul className="flex flex-col gap-2 sm:justify-center">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm leading-6 text-text-primary"
                    >
                      <Check
                        className="mt-1 size-3.5 shrink-0 text-brand-hover"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
