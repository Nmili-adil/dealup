import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  TrendingUp,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { GradientText } from "@/components/ui/titleCustomize";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Section } from "@/components/layout/section";

/**
 * Why a growing team moves to the API — six benefits in a three-up grid.
 *
 * Icons and their tints stay in code and pair with the dictionary by index;
 * the tints come from the shared chart ramp so the row carries some colour
 * without inventing hues outside the design system.
 */
const BENEFITS: Array<{ icon: LucideIcon; tint: string }> = [
  { icon: UsersRound, tint: "bg-chart-1/12 text-chart-1" },
  { icon: BadgeCheck, tint: "bg-chart-4/12 text-chart-4" },
  { icon: TrendingUp, tint: "bg-chart-2/12 text-chart-2" },
  { icon: Headphones, tint: "bg-chart-3/12 text-chart-3" },
  { icon: Wallet, tint: "bg-chart-1/12 text-chart-1" },
  { icon: ShieldCheck, tint: "bg-chart-4/12 text-chart-4" },
];

export function ApiBenefits({
  dictionary,
}: {
  dictionary: Dictionary["whatsappBusinessApi"]["benefits"];
}) {
  return (
    <Section aria-labelledby="api-benefits-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="api-benefits-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          {dictionary.title} <GradientText>{dictionary.highlight}</GradientText>
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.subtitle}</p>
      </div>

      <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {dictionary.items.map((item, index) => {
          const { icon: Icon, tint } = BENEFITS[index];
          return (
            <li key={item.title}>
              <MotionReveal delay={index * 0.06}>
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-xl",
                      tint
                    )}
                  >
                    <Icon className="size-5.5" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-snug tracking-[-0.01em] text-text-primary">
                      <GradientText>{item.title}</GradientText>
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
