import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/**
 * One use case followed all the way through, ending in the record it produces.
 *
 * The band is full-bleed but the content is wrapped in a `Container` — without
 * it the copy column sat flush against the viewport edge with no gutter.
 */
export function FormsSpotlight({
  dictionary,
}: {
  dictionary: Dictionary["whatsappForms"]["spotlight"];
}) {
  return (
    <Section tone="mint" spacing="lg" aria-labelledby="forms-spotlight-title">
      {/* A soft bloom behind the device gives the flat band some depth. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute left-1/2 top-1/2 size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges opacity-60" />
      </div>

      <Container className="max-w-[1280px]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.82fr)_minmax(0,0.78fr)] lg:gap-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-hover ring-1 ring-brand-dark/8">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
              {dictionary.eyebrow}
            </span>

            <h2
              id="forms-spotlight-title"
              className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
            >
              <GradientText>{dictionary.title}</GradientText>
            </h2>
            <p className="mt-3 max-w-md text-base leading-7 text-text-on-sand">
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

          <MotionReveal delay={0.1} scale={0.97}>
            <div className="relative mx-auto w-fit">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/12 blur-3xl"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[16%] bottom-[3%] -z-10 h-7 rounded-[50%] bg-brand-dark/15 blur-2xl"
              />
              <Mockup
                name="forms-quote"
                alt={dictionary.imageAlt}
                ratio="725 / 1370"
                sizes="(max-width: 1024px) 70vw, 28vw"
                className="mx-auto max-h-[440px] w-auto object-contain drop-shadow-[0_18px_28px_rgba(6,64,47,0.16)]"
              />
            </div>
          </MotionReveal>

          {/* The record the submission produces — the point of the whole flow,
              so it gets an arrow tying it back to the device beside it. */}
          <MotionReveal delay={0.18}>
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -start-6 top-1/2 hidden -translate-y-1/2 text-brand/40 lg:block"
              >
                <ArrowRight className="size-5 rtl:rotate-180" />
              </span>

              <div className="overflow-hidden rounded-2xl bg-white shadow-e3 ring-1 ring-brand-dark/8">
                <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-secondary">
                    {dictionary.resultTitle}
                  </p>
                  <span aria-hidden="true" className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-brand" />
                    <span className="size-1.5 rounded-full bg-brand/35" />
                    <span className="size-1.5 rounded-full bg-brand/20" />
                  </span>
                </div>

                <dl className="flex flex-col px-5 py-1">
                  {dictionary.resultRows.map((row, index) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 border-b border-border/60 py-3 last:border-b-0"
                    >
                      <dt className="text-xs text-text-secondary">{row.label}</dt>
                      <dd
                        className={
                          "text-end text-sm font-semibold tabular-nums " +
                          // The first row is the outcome; it reads as a state,
                          // so it takes a pill rather than plain type.
                          (index === 0
                            ? "rounded-full bg-surface-mint px-2.5 py-0.5 text-brand-hover"
                            : "text-text-primary")
                        }
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
