import { Container } from "@/components/layout/container";
import { GradientText } from "@/components/ui/titleCustomize";
import { getHelpContent } from "@/content/help";
import { HelpBrowser } from "./help-browser";
import { HelpContact } from "./help-contact";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function HelpCentrePage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["help"];
}) {
  const { hero } = dictionary;
  const { articles } = getHelpContent(locale);

  return (
    <div className="overflow-hidden bg-white">
      {/* A plain <section>: it runs full-bleed under the fixed navbar and owns
          bespoke padding, which the shared spacing scale would fight. */}
      <section className="relative -mt-18 overflow-hidden bg-linear-to-b from-cream via-sand to-sand pb-16 pt-28 sm:pt-30">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -end-32 -top-40 size-[520px] rounded-full bg-brand/12 blur-3xl" />
          <span className="absolute -bottom-48 -start-24 size-[420px] rounded-full bg-brand/8 blur-3xl" />
          <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
          <span className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-white" />
        </div>

        <Container className="relative max-w-[1280px]">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-hover ring-1 ring-brand-dark/10">
              {hero.badge}
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-balance text-text-primary sm:text-5xl">
              {hero.titleLead} <GradientText>{hero.titleAccent}</GradientText>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-text-on-sand sm:text-lg">
              {hero.description}
            </p>
          </div>

          <HelpBrowser locale={locale} dictionary={dictionary} articles={articles} />
        </Container>
      </section>

      <Container className="max-w-[1280px]">
        <HelpContact locale={locale} dictionary={dictionary.contact} />
      </Container>
    </div>
  );
}
