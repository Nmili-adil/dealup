import { CalendarClock, PenLine, Rocket, Users } from "lucide-react";
import { Mockup } from "@/components/product/mockup";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Users, PenLine, CalendarClock, Rocket];

export function MarketingBuilder({
  dictionary,
}: {
  dictionary: Dictionary["marketingSolution"]["builder"];
}) {
  return (
    <Section id="marketing-builder" tone="white" spacing="lg" decoration="grid" aria-labelledby="marketing-builder-title">
      <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          id="marketing-builder-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-5 py-3.5">
              <p className="text-sm font-semibold text-text-primary">{dictionary.windowTitle}</p>
            </div>
            <ol className="divide-y divide-border/70">
              {dictionary.steps.map((step, index) => {
                const Icon = icons[index];
                return (
                  <li key={step.title} className="flex items-start gap-4 px-5 py-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-mint text-brand-hover">
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-text-primary">{step.title}</span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-hover">
                          {index + 1}
                        </span>
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-text-secondary">{step.description}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="flex items-center gap-3 border-t border-border bg-surface-mint/50 px-5 py-4">
              <span className="text-sm font-semibold text-brand-dark">{dictionary.launchLabel}</span>
              <span className="ms-auto hidden text-xs text-text-secondary sm:block">{dictionary.note}</span>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.18}>
          <Mockup
            name="marketing-builder"
            alt={dictionary.imageAlt}
            ratio="3 / 2"
            sizes="(max-width: 1280px) 94vw, 1180px"
            className="mt-8 rounded-2xl border border-border shadow-e2"
          />
        </MotionReveal>
      </Container>
    </Section>
  );
}