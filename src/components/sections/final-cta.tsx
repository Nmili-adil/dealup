import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
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
    <Section tone="forest">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            {dictionary.headline}
          </h2>
          <p className="max-w-md text-lg text-white/70">{dictionary.description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="inverted">
              <Link href={localizedHref(locale, "/get-started")}>{dictionary.primaryCta}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border-white/20 bg-transparent text-white hover:border-white/60"
            >
              <Link href={localizedHref(locale, "/book-demo")}>{dictionary.secondaryCta}</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 sm:p-8">
          <FinalCtaForm dictionary={dictionary.form} />
        </div>
      </Container>
    </Section>
  );
}
