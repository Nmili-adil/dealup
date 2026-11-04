import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** The dark band: every entry point becomes a thread in the shared inbox. */
export function WmTouchpoint({
  dictionary,
}: {
  dictionary: Dictionary["whatsappMarketing"]["touchpoint"];
}) {
  return (
    <Section spacing="md">
      <MotionReveal>
        <div className="overflow-hidden rounded-3xl bg-brand-dark px-6 py-10 text-white sm:px-10 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
            <div>
              <h2
                id="wm-touchpoint-title"
                className="max-w-lg text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl"
              >
                {dictionary.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                {dictionary.description}
              </p>

              <ul className="mt-7 flex flex-col gap-3">
                {dictionary.items.map((item, index) => (
                  <MotionReveal key={item} delay={0.06 + index * 0.05}>
                    <li className="flex items-start gap-2.5 text-sm text-white/85">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-[#8ef0b5] text-brand-dark"
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  </MotionReveal>
                ))}
              </ul>

              <MotionReveal delay={0.34}>
                <a
                  href="#wm-industries-title"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ef0b5]"
                >
                  {dictionary.cta}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </a>
              </MotionReveal>
            </div>

            <MotionReveal delay={0.12} scale={0.97}>
              <Mockup
                name="click-to-whatsapp"
                alt={dictionary.imageAlt}
                ratio="1146 / 1307"
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="mx-auto max-h-[420px] w-auto object-contain"
              />
            </MotionReveal>
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
