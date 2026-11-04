import Image from "next/image";
import { ArrowRight, BellRing, Megaphone, MessageSquareText, RotateCcw, ScanLine, Send } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

const attentionIcons = [Megaphone, ScanLine, MessageSquareText];
const retentionIcons = [Send, BellRing, RotateCcw];

export function EcommerceGrowth({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["ecommerceSolution"]["growth"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="ecommerce-growth-title">
      <Container className="max-w-[1280px]">
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_0.72fr_0.8fr] lg:gap-10">
          <MotionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.eyebrow}</p>
            <h2 id="ecommerce-growth-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.attentionTitle}</h2>
            <div className="mt-6 space-y-5">{dictionary.attentionItems.map((item, index) => { const Icon = attentionIcons[index]; return <div key={item.title} className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-mint text-brand-hover"><Icon className="size-4.5" aria-hidden="true" /></span><div><h3 className="text-sm font-semibold text-text-primary">{item.title}</h3><p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p></div></div>; })}</div>
          </MotionReveal>

          <MotionReveal delay={0.08} y={20}>
            <figure className="mx-auto w-full max-w-[420px]">
              <Image
                src="/assets/ecommerce/happy-shopper.webp"
                alt={dictionary.imageAlt}
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 86vw, 32vw"
                className="aspect-[4/5] w-full rounded-[2rem] object-cover"
              />
              <figcaption className="mt-3 text-center text-xs leading-5 text-text-secondary">{dictionary.photoCaption}</figcaption>
            </figure>
          </MotionReveal>

          <MotionReveal delay={0.14}>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.retentionTitle}</h2>
            <div className="mt-6 space-y-5">{dictionary.retentionItems.map((item, index) => { const Icon = retentionIcons[index]; return <div key={item.title} className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#f3eadb] text-[#8a602f]"><Icon className="size-4.5" aria-hidden="true" /></span><div><h3 className="text-sm font-semibold text-text-primary">{item.title}</h3><p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p></div></div>; })}</div>
          </MotionReveal>
        </div>

        <div className="mt-9 flex justify-center"><Button asChild variant="secondary" className="border-brand/35"><a href={localizedHref(locale, "/#early-access")}>{dictionary.cta}<ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" /></a></Button></div>
      </Container>
    </Section>
  );
}
