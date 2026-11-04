import { Check, FileText, Microscope, Pill, TestTubes } from "lucide-react";
import { Mockup } from "@/components/product/mockup";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [TestTubes, Microscope, Pill, FileText];

export function HealthcareResults({
  dictionary,
}: {
  dictionary: Dictionary["healthcareSolution"]["results"];
}) {
  return (
    <Section tone="light" spacing="lg" aria-labelledby="healthcare-results-title">
      <Container className="max-w-[1280px]">
        <SectionHeader
          id="healthcare-results-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dictionary.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <MotionReveal key={item.title} delay={0.05 * index} className="h-full">
                <article className="h-full rounded-2xl border border-border/70 bg-white p-5 shadow-e1">
                  <span className="grid size-11 place-items-center rounded-2xl bg-surface-mint text-brand-hover">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
                </article>
              </MotionReveal>
            );
          })}
        </div>

        <MotionReveal delay={0.2}>
          <ul className="mx-auto mt-8 grid max-w-[920px] gap-3 sm:grid-cols-3">
            {dictionary.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 rounded-xl border border-brand-dark/8 bg-white px-4 py-3 text-sm leading-6 text-text-primary shadow-e1">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </MotionReveal>

        <MotionReveal delay={0.26}>
          <Mockup
            name="healthcare-results-secure"
            alt={dictionary.imageAlt}
            ratio="2 / 1"
            sizes="(max-width: 1280px) 94vw, 1180px"
            className="mt-8 rounded-2xl border border-brand-dark/8 shadow-e2"
          />
        </MotionReveal>
      </Container>
    </Section>
  );
}
