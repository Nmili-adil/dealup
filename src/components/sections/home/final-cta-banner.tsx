import Link from "next/link";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Button } from "@/components/ui/button";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function FinalCtaBanner({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["home"]["finalCta"];
}) {
  return (
    <section className="bg-white pb-14 pt-8">
      <Container>
        <MotionReveal>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-brand-dark px-6 py-12 ring-1 ring-white/10 sm:px-12 sm:py-14">
            {/* Layered depth rather than one flat fill: a warm bloom from the
                top corner, a cooler one opposite, a faint grid, and a hairline
                highlight along the top edge to catch the light. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <span className="absolute -right-24 -top-32 size-[440px] rounded-full bg-brand/25 blur-3xl" />
              <span className="absolute -bottom-40 -left-24 size-[380px] rounded-full bg-brand/10 blur-3xl" />
              <span className="absolute inset-0 bg-grid-inverted mask-fade-edges" />
              <span className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
            </div>

            <div className="flex flex-col items-center gap-8 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/15 backdrop-blur-sm">
                <BadgeCheck className="size-3.5 text-brand" aria-hidden="true" />
                {dictionary.eyebrow}
              </span>

              <div className="flex max-w-2xl flex-col gap-3">
                <h2 className="text-3xl font-semibold leading-[1.12] tracking-tight text-balance text-white sm:text-4xl lg:text-[42px]">
                  {dictionary.headline}
                </h2>
                <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                  {dictionary.description}
                </p>
              </div>

              <div className="flex w-full flex-col items-center gap-4">
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Button asChild size="lg" className="shadow-brand">
                    <Link href={localizedHref(locale, "/#early-access")}>
                      {dictionary.primaryCta}
                      <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10"
                  >
                    <Link href={localizedHref(locale, "/book-demo")}>
                      {dictionary.secondaryCta}
                    </Link>
                  </Button>
                </div>

                <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/70">
                  {dictionary.reassurances.map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <Check className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="border-t border-white/10 pt-6 text-xs text-white/70">
                {dictionary.note}
              </p>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
