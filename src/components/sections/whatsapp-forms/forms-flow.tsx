import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** The dark band: a form is one step inside a larger no-code flow. */
export function FormsFlow({
  dictionary,
}: {
  dictionary: Dictionary["whatsappForms"]["flow"];
}) {
  return (
    <Section spacing="lg">
      <MotionReveal>
        <div className="overflow-hidden rounded-3xl bg-brand-dark px-6 py-10 text-white sm:px-10 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8ef0b5]">
                {dictionary.eyebrow}
              </p>
              <h2
                id="forms-flow-title"
                className="mt-2 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl"
              >
                {dictionary.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                {dictionary.description}
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {dictionary.items.map((item, index) => (
                  <MotionReveal key={item} delay={0.06 + index * 0.06}>
                    <li className="flex items-start gap-2.5 text-sm leading-6 text-white/85">
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

              <MotionReveal delay={0.3}>
                <a
                  href="#forms-mobile-title"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ef0b5]"
                >
                  {dictionary.cta}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </a>
              </MotionReveal>
            </div>

            <MotionReveal delay={0.12} scale={0.97}>
              {/* On the dark band the render needs a light bloom behind it,
                  not a ring — its corners are transparent, so a ring would
                  outline empty space. */}
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8ef0b5]/12 blur-3xl"
                />
                <Mockup
                  name="forms-flow"
                  alt={dictionary.imageAlt}
                  ratio="1399 / 831"
                  sizes="(max-width: 1024px) 92vw, 56vw"
                  className="w-full object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)]"
                />
              </div>
            </MotionReveal>
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
