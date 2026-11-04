import Image from "next/image";
import { BellRing, CalendarClock, Megaphone, MessageSquareText, QrCode, RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const sourceIcons = [Megaphone, QrCode, MessageSquareText];
const nurtureIcons = [BellRing, CalendarClock, RotateCcw];

export function RealEstateGrowth({
  dictionary,
}: {
  dictionary: Dictionary["realEstateSolution"]["growth"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="real-estate-growth-title">
      <Container className="max-w-[1280px]">
        <MotionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.eyebrow}</p>
            <h2 id="real-estate-growth-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.title}</h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.description}</p>
          </div>
        </MotionReveal>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.8fr_0.74fr_0.8fr] lg:gap-10">
          <MotionReveal>
            <h3 className="text-xl font-semibold text-text-primary">{dictionary.sourceTitle}</h3>
            <div className="mt-6 space-y-5">
              {dictionary.sourceItems.map((item, index) => { const Icon = sourceIcons[index]; return <div key={item.title} className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-mint text-brand-hover"><Icon className="size-4.5" aria-hidden="true" /></span><div><h4 className="text-sm font-semibold text-text-primary">{item.title}</h4><p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p></div></div>; })}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08} y={20}>
            <figure className="mx-auto w-full max-w-[420px]">
              <Image
                src="/assets/real-estate/happy-homebuyers.webp"
                alt={dictionary.imageAlt}
                width={1122}
                height={1402}
                sizes="(max-width: 1024px) 86vw, 32vw"
                className="aspect-[4/5] w-full rounded-[2rem] object-cover"
              />
              <figcaption className="mt-3 text-center text-xs leading-5 text-text-secondary">{dictionary.photoCaption}</figcaption>
            </figure>
          </MotionReveal>

          <MotionReveal delay={0.14}>
            <h3 className="text-xl font-semibold text-text-primary">{dictionary.nurtureTitle}</h3>
            <div className="mt-6 space-y-5">
              {dictionary.nurtureItems.map((item, index) => { const Icon = nurtureIcons[index]; return <div key={item.title} className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#f3eadb] text-[#8a602f]"><Icon className="size-4.5" aria-hidden="true" /></span><div><h4 className="text-sm font-semibold text-text-primary">{item.title}</h4><p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p></div></div>; })}
            </div>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
