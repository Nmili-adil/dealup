import { CircleDot, FileText, Globe, MessageCircle, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons and tints stay in code and pair with the translated types by index. */
const TYPES: Array<{ icon: LucideIcon; tint: string }> = [
  { icon: MessageCircle, tint: "bg-chart-1/12 text-chart-1" },
  { icon: Globe, tint: "bg-chart-4/12 text-chart-4" },
  { icon: FileText, tint: "bg-chart-2/12 text-chart-2" },
  { icon: CircleDot, tint: "bg-chart-3/12 text-chart-3" },
];

export function AdsTypes({
  dictionary,
}: {
  dictionary: Dictionary["metaAdsManager"]["adTypes"];
}) {
  return (
    <Section tone="mint" spacing="lg" aria-labelledby="ads-types-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="ads-types-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          <GradientText>{dictionary.title}</GradientText>
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.subtitle}</p>
      </div>

      <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dictionary.items.map((item, index) => {
          const { icon: Icon, tint } = TYPES[index];
          return (
            <li key={item.title}>
              <MotionReveal delay={index * 0.06}>
                <article className="h-full rounded-2xl border border-border/80 bg-white p-5 shadow-e1">
                  <span
                    aria-hidden="true"
                    className={cn("grid size-11 place-items-center rounded-xl", tint)}
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-text-primary">
                    <GradientText>{item.title}</GradientText>
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-text-secondary">{item.description}</p>
                </article>
              </MotionReveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
