import { BarChart3, LayoutGrid, Target, Wallet, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated items by index. */
const ICONS: LucideIcon[] = [LayoutGrid, Target, Wallet, BarChart3];

export function AdsDashboard({
  dictionary,
}: {
  dictionary: Dictionary["metaAdsManager"]["dashboard"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="ads-dashboard-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="ads-dashboard-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          {dictionary.title} <GradientText>{dictionary.highlight}</GradientText>
        </h2>
      </div>

      <MotionReveal delay={0.08} scale={0.98}>
          <Mockup
            name="wba-analytics"
            alt={dictionary.imageAlt}
            ratio="1652 / 847"
            sizes="(max-width: 1280px) 94vw, 1200px"
            className="w-full rounded-2xl object-contain"
          />
      </MotionReveal>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dictionary.items.map((item, index) => {
          const Icon = ICONS[index];
          return (
            <li key={item.title}>
              <MotionReveal delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-border/80 bg-white p-5 shadow-e1">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-xl bg-surface-mint text-brand-hover"
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-3.5 text-[15px] font-semibold leading-snug text-text-primary">
                    <GradientText>{item.title}</GradientText>
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-text-secondary">{item.description}</p>
                </div>
              </MotionReveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
