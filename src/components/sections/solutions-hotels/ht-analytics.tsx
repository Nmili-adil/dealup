import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Mockup } from "@/components/product/mockup";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function HtAnalytics({
  dictionary,
}: {
  dictionary: Dictionary["hotelsSolution"]["analytics"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="ht-analytics-title">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <SectionHeader
          id="ht-analytics-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="relative mx-auto w-full max-w-[680px]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[12%] bottom-[6%] -z-10 h-20 rounded-[50%] bg-brand-dark/16 blur-3xl"
            />
            <Mockup
              name="hotels-analytics-dashboard"
              alt={dictionary.windowTitle}
              sizes="(min-width: 1024px) 44vw, 94vw"
              className="relative z-10 mx-auto max-h-[520px] object-contain"
            />
          </div>
        </MotionReveal>

        <MotionReveal delay={0.2}>
          <ul className="mt-6 space-y-3 lg:col-start-1 lg:row-start-2">
            {dictionary.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Container>
    </Section>
  );
}
