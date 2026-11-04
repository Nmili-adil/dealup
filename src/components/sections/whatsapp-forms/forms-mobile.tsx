import { CheckCircle2, GitBranch, ListChecks, Smartphone, TimerReset, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated items by index. */
const ICONS: LucideIcon[] = [ListChecks, TimerReset, GitBranch, CheckCircle2, Smartphone];

export function FormsMobile({
  dictionary,
}: {
  dictionary: Dictionary["whatsappForms"]["mobile"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="forms-mobile-title">
      <h2
        id="forms-mobile-title"
        className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
      >
        <GradientText>{dictionary.title}</GradientText>
      </h2>

      <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {dictionary.items.map((item, index) => {
          const Icon = ICONS[index];
          return (
            <li key={item.title} className="h-full">
              <MotionReveal delay={index * 0.05} className="h-full">
                <div className="h-full rounded-2xl border border-border/80 bg-white p-4 shadow-e1">
                  <span
                    aria-hidden="true"
                    className="grid size-9 place-items-center rounded-lg bg-surface-mint text-brand-hover"
                  >
                    <Icon className="size-4.5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-3.5 text-sm font-semibold text-text-primary">
                    <GradientText>{item.title}</GradientText>
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-text-secondary">{item.description}</p>
                </div>
              </MotionReveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
