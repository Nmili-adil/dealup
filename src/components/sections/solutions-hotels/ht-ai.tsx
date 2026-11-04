import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Mockup } from "@/components/product/mockup";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function HtAi({
  dictionary,
}: {
  dictionary: Dictionary["hotelsSolution"]["ai"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="ht-ai-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <MotionReveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-[640px]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[14%] bottom-[5%] -z-10 h-20 rounded-[50%] bg-ai/16 blur-3xl"
            />
            <Mockup
              name="hotels-ai-concierge"
              alt={dictionary.windowTitle}
              sizes="(min-width: 1024px) 42vw, 94vw"
              className="relative z-10 mx-auto max-h-[540px] object-contain"
            />
          </div>
        </MotionReveal>

        <div className="flex flex-col gap-8">
          <SectionHeader
            id="ht-ai-title"
            eyebrow={dictionary.eyebrow}
            headline={dictionary.title}
            description={dictionary.description}
            align="start"
          />

          <MotionReveal delay={0.2}>
            <ul className="space-y-3">
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
