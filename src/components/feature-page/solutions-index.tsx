import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import { Breadcrumbs } from "./breadcrumbs";
import { FeatureFinalCta } from "./feature-final-cta";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";

type SolutionsIndexCopy = {
  meta: { title: string; description: string };
  hero: {
    breadcrumb: string;
    badge: string;
    headlineLead: string;
    headlineAccent: string;
    description: string;
  };
  solutions: { eyebrow: string; title: string; description: string };
  industries: { eyebrow: string; title: string; description: string };
  cardCta: string;
  finalCta: { title: string; description: string };
};

type IndexItem = { title: string; description: string; href: string };

function GridSection({
  copy,
  items,
  locale,
  id,
  cardCta,
}: {
  copy: { eyebrow: string; title: string; description: string };
  items: readonly IndexItem[];
  locale: Locale;
  id: string;
  cardCta: string;
}) {
  return (
    <Section id={id} tone="white" spacing="lg" decoration={id === "solutions-grid" ? "glow" : "none"}>
      <div>
        <Container className="flex flex-col gap-12">
          <SectionHeader
            id={id + "-title"}
            eyebrow={copy.eyebrow}
            headline={copy.title}
            description={copy.description}
            align="center"
            className="mx-auto text-center"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li key={item.href} className="h-full">
                <MotionReveal delay={0.05 * index} duration={0.5} y={20}>
                  <Card
                    interactive
                    padding="lg"
                    className="group h-full hover:border-brand/35 hover:shadow-e3"
                  >
                    <h3 className="text-lg font-semibold tracking-tight text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                    <Link
                      href={localizedHref(locale, item.href)}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-hover transition-colors group-hover:text-brand-dark"
                    >
                      {cardCta}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </Link>
                  </Card>
                </MotionReveal>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </Section>
  );
}

export function SolutionsIndex({
  locale,
  copy,
  solutionItems,
  industryItems,
  homeLabel,
  primaryCta,
  secondaryCta,
}: {
  locale: Locale;
  copy: SolutionsIndexCopy;
  solutionItems: readonly IndexItem[];
  industryItems: readonly IndexItem[];
  homeLabel: string;
  primaryCta: string;
  secondaryCta: string;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <section className="relative -mt-18 overflow-hidden bg-linear-to-b from-cream via-sand to-sand pb-14 pt-20 sm:pb-16 sm:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -end-32 -top-40 size-[520px] rounded-full bg-brand/12 blur-3xl" />
          <span className="absolute -bottom-48 -start-24 size-[420px] rounded-full bg-brand/8 blur-3xl" />
          <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
          <span className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-white" />
        </div>

        <Container className="relative">
          <Breadcrumbs
            locale={locale}
            ariaLabel={copy.hero.breadcrumb}
            crumbs={[{ label: homeLabel, href: "/" }, { label: copy.hero.breadcrumb, current: true }]}
          />

          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-5 text-center">
            <MotionReveal delay={0.02}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-hover ring-1 ring-brand-dark/10">
                <Check className="size-3.5 shrink-0" aria-hidden="true" />
                {copy.hero.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <h1 className="text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-balance text-text-primary sm:text-5xl lg:text-[56px]">
                {copy.hero.headlineLead}
                <GradientText>{copy.hero.headlineAccent}</GradientText>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="max-w-2xl text-base leading-relaxed text-text-on-sand sm:text-lg">
                {copy.hero.description}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
                  <a href={localizedHref(locale, "/#early-access")}>{primaryCta}</a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border-brand/40 bg-white/70">
                  <a href={localizedHref(locale, "/book-demo")}>{secondaryCta}</a>
                </Button>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <GridSection
        id="solutions-grid"
        copy={copy.solutions}
        items={solutionItems}
        locale={locale}
        cardCta={copy.cardCta}
      />

      <GridSection id="industries-grid" copy={copy.industries} items={industryItems} locale={locale} cardCta={copy.cardCta} />

      <FeatureFinalCta
        locale={locale}
        copy={copy.finalCta}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />
    </div>
  );
}