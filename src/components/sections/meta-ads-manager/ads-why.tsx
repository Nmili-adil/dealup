import { Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function AdsWhy({
  dictionary,
}: {
  dictionary: Dictionary["metaAdsManager"]["why"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="ads-why-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2
            id="ads-why-title"
            className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.035em] text-text-primary sm:text-4xl"
          >
            {dictionary.title} <GradientText>{dictionary.highlight}</GradientText>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary">
            {dictionary.description}
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {dictionary.items.map((item, index) => (
              <MotionReveal key={item} delay={0.05 + index * 0.05}>
                <li className="flex items-start gap-2.5 text-sm leading-6 text-text-primary">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-hover"
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              </MotionReveal>
            ))}
          </ul>
        </div>

        <MotionReveal delay={0.12} scale={0.97}>
            <Mockup
              name="click-to-whatsapp"
              alt={dictionary.description}
              ratio="1146 / 1307"
              sizes="(max-width: 1024px) 86vw, 44vw"
              className="mx-auto max-h-[420px] w-auto  object-contain "
            />
        </MotionReveal>
      </div>
    </Section>
  );
}
