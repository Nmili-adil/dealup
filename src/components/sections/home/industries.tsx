import { ShoppingCart, Building2, ConciergeBell, Stethoscope, GraduationCap, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [ShoppingCart, Building2, ConciergeBell, Stethoscope, GraduationCap, Users];

export function Industries({ dictionary }: { dictionary: Dictionary["home"]["industries"] }) {
  return (
    <Section tone="white" spacing="sm">
      <Container className="flex flex-col items-center gap-7">
        <div className="flex flex-col items-center gap-3 text-center">
          <MotionReveal>
            <span className="text-sm font-medium text-brand-hover">{dictionary.label}</span>
          </MotionReveal>
          <MotionReveal delay={0.06}>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-text-primary sm:text-4xl">
              {dictionary.headline}
            </h2>
          </MotionReveal>
        </div>

        <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
          {dictionary.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <li key={item}>
                <MotionReveal
                  delay={index * 0.05}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-14 place-items-center rounded-2xl bg-surface-mint text-brand-dark"
                  >
                    <Icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-medium text-balance text-text-primary">
                    {item}
                  </span>
                </MotionReveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
