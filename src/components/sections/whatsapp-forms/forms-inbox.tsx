import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function FormsInbox({
  dictionary,
}: {
  dictionary: Dictionary["whatsappForms"]["inbox"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="forms-inbox-title">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover">
            {dictionary.eyebrow}
          </p>
          <h2
            id="forms-inbox-title"
            className="mt-2 max-w-md text-3xl font-semibold leading-tight tracking-[-0.035em] text-text-primary sm:text-4xl"
          >
            <GradientText>{dictionary.title}</GradientText>
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

          <MotionReveal delay={0.3}>
            <a
              href="#forms-languages-title"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-hover hover:underline"
            >
              {dictionary.cta}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </a>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.12} scale={0.97}>
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[10%] bottom-[2%] -z-10 h-9 rounded-[50%] bg-brand-dark/12 blur-2xl"
            />
            <Mockup
              name="forms-inbox"
              alt={dictionary.imageAlt}
              ratio="1404 / 894"
              sizes="(max-width: 1024px) 92vw, 56vw"
              className="w-full object-contain drop-shadow-[0_22px_34px_rgba(6,64,47,0.15)]"
            />
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
