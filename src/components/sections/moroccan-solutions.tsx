import { ShoppingBag, Hotel, Building2, HeartPulse, GraduationCap, Briefcase } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [ShoppingBag, Hotel, Building2, HeartPulse, GraduationCap, Briefcase];

export function MoroccanSolutions({ dictionary }: { dictionary: Dictionary["moroccanSolutions"] }) {
  return (
    <Section tone="light">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={dictionary.eyebrow} headline={dictionary.headline} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.categories.map((category, index) => {
            const Icon = icons[index];
            return (
              <MotionReveal key={category.title} delay={(index % 3) * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-mint">
                    <Icon className="size-5 text-brand-hover" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary">{category.title}</h3>
                  <ul className="flex flex-col gap-1.5">
                    {category.useCases.map((useCase) => (
                      <li key={useCase} className="text-sm text-text-secondary">
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
