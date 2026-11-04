import Image from "next/image";
import { ArrowRight, Check, Headphones } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

export function EcommerceInbox({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["ecommerceSolution"]["inbox"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="ecommerce-inbox-title">
      <Container className="max-w-[1360px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-12">
          <MotionReveal>
            <figure className="mb-7">
              <Image
                src="/assets/ecommerce/merchant-client.webp"
                alt={dictionary.clientImageAlt}
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 92vw, 36vw"
                className="aspect-[4/3] w-full rounded-[2rem] object-cover"
              />
              <figcaption className="mt-3 text-xs leading-5 text-text-secondary">
                {dictionary.photoCaption}
              </figcaption>
            </figure>
            <span className="grid size-11 place-items-center rounded-2xl bg-brand-dark text-white"><Headphones className="size-5" aria-hidden="true" /></span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.eyebrow}</p>
            <h2 id="ecommerce-inbox-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.title}</h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.description}</p>
            <ul className="mt-6 space-y-3">{dictionary.points.map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary"><Check className="mt-1 size-4 shrink-0 text-brand-hover" aria-hidden="true" />{point}</li>)}</ul>
            <Button asChild variant="secondary" className="mt-7 border-brand/35"><a href={localizedHref(locale, "/#early-access")}>{dictionary.cta}<ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" /></a></Button>
          </MotionReveal>
          <MotionReveal delay={0.1} y={20}>
              <Mockup name="chats-mockup" alt={dictionary.imageAlt} ratio="1287 / 983" sizes="(max-width: 1024px) 94vw, 66vw" className="drop-shadow-[0_24px_32px_rgba(6,64,47,0.13)]" />
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
