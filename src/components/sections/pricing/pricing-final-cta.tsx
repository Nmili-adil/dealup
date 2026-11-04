import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function PricingFinalCta({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["pricing"]["finalCta"];
}) {
  return (
    <Section spacing="md" className="pb-20 md:pb-24">
      <Container>
        <MotionReveal>
          <div className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-3xl bg-brand-dark px-6 py-12 text-center text-white sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 -z-10 h-56 w-[560px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-3xl"
            />
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
              {dictionary.title}
            </h2>
            <p className="max-w-xl text-sm leading-6 text-white/70 sm:text-base">
              {dictionary.description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="inverted" className="rounded-xl px-7">
                <a href={localizedHref(locale, "/#early-access")}>{dictionary.primaryCta}</a>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-xl border border-white/50 bg-transparent px-7 hover:bg-white/10"
              >
                <a href={localizedHref(locale, "/contact")}>{dictionary.secondaryCta}</a>
              </Button>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
