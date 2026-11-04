import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

export function EcommerceCatalog({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["ecommerceSolution"]["catalog"];
}) {
  return (
    <Section id="ecommerce-catalog" tone="mint" spacing="lg" decoration="grid" aria-labelledby="ecommerce-catalog-title">
      <Container className="max-w-[1280px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <MotionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.eyebrow}</p>
            <h2 id="ecommerce-catalog-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.title}</h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.description}</p>
            <ul className="mt-6 space-y-3">
              {dictionary.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary">
                  <Check className="mt-1 size-4 shrink-0 text-brand-hover" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <Button asChild variant="secondary" className="mt-7 border-brand/35 bg-white">
              <a href={localizedHref(locale, "/#early-access")}>
                {dictionary.cta}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </a>
            </Button>
          </MotionReveal>

          <MotionReveal delay={0.1} y={20}>
            <Image
              src="/assets/ecommerce/catalog-orders-mockup.webp"
              alt={dictionary.imageAlt}
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 94vw, 62vw"
              className="h-auto w-full drop-shadow-[0_24px_34px_rgba(6,64,47,0.12)]"
            />
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
