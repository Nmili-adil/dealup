import {
  BarChart3,
  CalendarClock,
  FileCheck2,
  Repeat2,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated features by index. */
const ICONS: LucideIcon[] = [Users, FileCheck2, Sparkles, CalendarClock, Repeat2, BarChart3];

export function WmFeatures({
  dictionary,
}: {
  dictionary: Dictionary["whatsappMarketing"]["features"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="wm-features-title">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div>
          <h2
            id="wm-features-title"
            className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.035em] text-text-primary sm:text-4xl"
          >
            {dictionary.title} <GradientText>{dictionary.highlight}</GradientText>
          </h2>

          <ul className="mt-8 flex flex-col gap-5">
            {dictionary.items.map((item, index) => {
              const Icon = ICONS[index];
              return (
                <li key={item.title}>
                  <MotionReveal delay={index * 0.05}>
                    <div className="flex items-start gap-3.5">
                      <span
                        aria-hidden="true"
                        className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-mint text-brand-hover"
                      >
                        <Icon className="size-4.5" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-semibold leading-snug text-text-primary">
                          <GradientText>{item.title}</GradientText>
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </MotionReveal>
                </li>
              );
            })}
          </ul>
        </div>

        <MotionReveal delay={0.12} scale={0.97}>
          <div className=" sm:p-5">
            <Mockup
              name="wba-analytics"
              alt={dictionary.imageAlt}
              ratio="1652 / 847"
              sizes="(max-width: 1024px) 90vw, 52vw"
              className="w-full  object-contain "
            />
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
