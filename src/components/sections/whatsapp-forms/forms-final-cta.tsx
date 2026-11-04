import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function FormsFinalCta({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["whatsappForms"]["finalCta"];
}) {
  return (
    <Section spacing="md">
      <MotionReveal>
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-brand-dark px-6 py-9 text-center text-white sm:flex-row sm:justify-between sm:gap-8 sm:px-10 sm:text-start">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              {dictionary.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">{dictionary.description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="inverted" className="rounded-lg px-7">
              <a href={localizedHref(locale, "/#early-access")}>{dictionary.primaryCta}</a>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-lg border border-white/50 bg-transparent px-7 hover:bg-white/10"
            >
              <a href={localizedHref(locale, "/#early-access")}>{dictionary.secondaryCta}</a>
            </Button>
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
