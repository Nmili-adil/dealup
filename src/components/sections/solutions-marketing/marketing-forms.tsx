import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { MarketingFormsDemo } from "./marketing-forms-demo";

export function MarketingForms({
  dictionary,
}: {
  dictionary: Dictionary["marketingSolution"]["forms"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="marketing-forms-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <MotionReveal delay={0.1} className="lg:col-start-2 lg:row-start-1">
          <MarketingFormsDemo copy={dictionary} />
        </MotionReveal>

        {/* Header and points share one grid cell. Held apart they landed in
            separate rows, and the tall phone stretched row one — which is what
            opened the gap between the description and the list. */}
        <div className="lg:col-start-1 lg:row-start-1">
          <SectionHeader
            id="marketing-forms-title"
            eyebrow={dictionary.eyebrow}
            headline={dictionary.title}
            description={dictionary.description}
            align="start"
          />

          <MotionReveal delay={0.2}>
            <ul className="mt-6 space-y-3">
              {dictionary.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}