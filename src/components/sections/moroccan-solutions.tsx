import { ShoppingBag, Hotel, Building2, HeartPulse, GraduationCap, Briefcase } from "lucide-react";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Card, IconTile } from "@/components/ui/card";
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
              <MotionReveal
                key={category.title}
                delay={(index % 3) * 0.08}
                className="h-full"
              >
                <Card interactive padding="lg" className="group h-full gap-4">
                  <IconTile className="group-hover:bg-brand-dark group-hover:text-white">
                    <Icon aria-hidden="true" />
                  </IconTile>

                  <h3 className="text-lg font-semibold text-text-primary">
                    {category.title}
                  </h3>

                  <ul className="flex flex-col gap-2">
                    {category.useCases.map((useCase) => (
                      <li
                        key={useCase}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </Card>
              </MotionReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
