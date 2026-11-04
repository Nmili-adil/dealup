import {
  ArrowRight,
  CircleGauge,
  CloudCog,
  MessageCircleMore,
  MousePointerClick,
  type LucideIcon,
} from "lucide-react";
import { GradientText } from "@/components/ui/titleCustomize";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated steps by index. */
const growthIcons: LucideIcon[] = [MousePointerClick, CloudCog, MessageCircleMore, CircleGauge];

/** The four steps from connecting a number to scaling on it. */
export function ApiGrowth({
  dictionary,
}: {
  dictionary: Dictionary["whatsappBusinessApi"]["growth"];
}) {
  return (
    <MotionReveal>
      <Section
        className="rounded-3xl border border-[#dcebe0] bg-[#f1f8f3] px-5 py-8 sm:px-8 lg:px-10"
        aria-labelledby="growth-title"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[0.64fr_1.36fr]">
          <h2
            id="growth-title"
            className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-text-primary"
          >
            {dictionary.title} <GradientText>{dictionary.highlight}</GradientText>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {dictionary.steps.map((step, index) => {
              const Icon = growthIcons[index];
              return (
                <div key={step.title} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#d9efdf] text-brand-hover">
                      <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    {index < dictionary.steps.length - 1 ? (
                      <ArrowRight className="hidden size-5 text-[#9bbfa6] rtl:rotate-180 xl:block" aria-hidden="true" />
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-text-primary">
                    {index + 1}. <GradientText>{step.title}</GradientText>
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-text-secondary">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </MotionReveal>
  );
}
