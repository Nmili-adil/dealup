import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { FinalCtaForm } from "@/components/forms/final-cta-form";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function FinalCta({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["finalCta"];
}) {
  return (
    <Section tone="forest" spacing="lg" decoration="grid">
      {/* Brand bloom behind the headline — anchors the final conversion beat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 size-[520px] rounded-full bg-brand/15 blur-3xl"
      />

      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <MotionReveal x={-24} y={0} className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            {dictionary.headline}
          </h2>

          <p className="max-w-md text-lg leading-relaxed text-white/75">
            {dictionary.description}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="inverted">
              <Link href={localizedHref(locale, "/get-started")}>
                {dictionary.primaryCta}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border-white/25 bg-transparent text-white hover:border-white/60 hover:bg-white/5"
            >
              <Link href={localizedHref(locale, "/book-demo")}>
                {dictionary.secondaryCta}
              </Link>
            </Button>
          </div>

          {/* Reuse the same reassurance points the hero opens with. */}
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {dictionary.reassurances.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm text-white/75">
                <Check className="size-4 shrink-0 text-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </MotionReveal>

        <MotionReveal x={24} y={0} delay={0.1}>
          <div className="rounded-2xl bg-white p-6 shadow-e4 sm:p-8">
            <FinalCtaForm dictionary={dictionary.form} />
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
