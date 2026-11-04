import { FlaskConical, LayoutTemplate, LineChart, PlugZap, Workflow, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated steps by index. */
const ICONS: LucideIcon[] = [LayoutTemplate, Workflow, FlaskConical, PlugZap, LineChart];

export function CbSteps({
  dictionary,
}: {
  dictionary: Dictionary["whatsappChatbot"]["steps"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="cb-steps-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="cb-steps-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          {dictionary.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.subtitle}</p>
      </div>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {dictionary.items.map((step, index) => {
          const Icon = ICONS[index];
          return (
            <li key={step.title}>
              <MotionReveal delay={index * 0.06}>
                <div className="relative h-full rounded-2xl border border-border/80 bg-white p-4 shadow-e1">
                  <span
                    aria-hidden="true"
                    className="absolute end-3 top-3 text-xl font-semibold tabular-nums text-brand/15"
                  >
                    {index + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-9 place-items-center rounded-lg bg-surface-mint text-brand-hover"
                  >
                    <Icon className="size-4.5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-3.5 text-sm font-semibold text-text-primary">
                    <GradientText>{step.title}</GradientText>
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-text-secondary">{step.description}</p>
                </div>
              </MotionReveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
