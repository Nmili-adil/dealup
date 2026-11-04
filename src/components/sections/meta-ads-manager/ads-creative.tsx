import { ImagePlus, PenLine, Sparkles, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated steps by index. */
const ICONS: LucideIcon[] = [PenLine, ImagePlus, Sparkles];

export function AdsCreative({
  dictionary,
}: {
  dictionary: Dictionary["metaAdsManager"]["creative"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="ads-creative-title">
      <div className="overflow-hidden rounded-3xl bg-brand-dark px-6 py-10 text-white sm:px-10 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div>
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-xl bg-[#8ef0b5]/15 text-[#8ef0b5]"
            >
              <Sparkles className="size-5" strokeWidth={1.8} />
            </span>
            <h2
              id="ads-creative-title"
              className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl"
            >
              {dictionary.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              {dictionary.description}
            </p>

            <ol className="mt-7 flex flex-col gap-4">
              {dictionary.items.map((item, index) => {
                const Icon = ICONS[index];
                return (
                  <MotionReveal key={item.title} delay={0.06 + index * 0.07}>
                    <li className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-[#8ef0b5]"
                      >
                        <Icon className="size-4.5" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-white/65">{item.description}</p>
                      </div>
                    </li>
                  </MotionReveal>
                );
              })}
            </ol>
          </div>

          <MotionReveal delay={0.12} scale={0.97}>
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/15">
              <Mockup
                name="wba-campaign"
                alt={dictionary.imageAlt}
                ratio="1086 / 1448"
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="mx-auto max-h-[400px] w-auto object-contain"
              />
            </div>
          </MotionReveal>
        </div>
      </div>
    </Section>
  );
}
