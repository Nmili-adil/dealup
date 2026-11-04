import { BarChart3, CalendarClock, FileText, Users, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated steps by index. */
const ICONS: LucideIcon[] = [Users, FileText, CalendarClock, BarChart3];

export function WmSteps({
  dictionary,
}: {
  dictionary: Dictionary["whatsappMarketing"]["steps"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="wm-steps-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="wm-steps-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          {dictionary.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.subtitle}</p>
      </div>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dictionary.items.map((step, index) => {
          const Icon = ICONS[index];
          return (
            <li key={step.title} className="h-full">
              <MotionReveal delay={index * 0.07} className="h-full">
                <div className="relative h-full rounded-2xl border border-border/80 bg-white p-5 shadow-e1">
                  <span
                    aria-hidden="true"
                    className="absolute end-4 top-4 text-2xl font-semibold tabular-nums text-brand/15"
                  >
                    {index + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-xl bg-surface-mint text-brand-hover"
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-text-primary">
                    <GradientText>{step.title}</GradientText>
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-text-secondary">{step.description}</p>
                </div>
              </MotionReveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
