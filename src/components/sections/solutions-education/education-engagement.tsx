import Image from "next/image";
import { BellRing, CalendarDays, CircleCheckBig, ClipboardCheck, Megaphone, RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const applicationIcons = [ClipboardCheck, CircleCheckBig, RotateCcw];
const communityIcons = [CalendarDays, BellRing, Megaphone];

export function EducationEngagement({
  dictionary,
}: {
  dictionary: Dictionary["educationSolution"]["engagement"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="education-engagement-title">
      <Container className="max-w-[1280px]">
        <MotionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.eyebrow}</p>
            <h2 id="education-engagement-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.title}</h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.description}</p>
          </div>
        </MotionReveal>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.8fr_0.74fr_0.8fr] lg:gap-10">
          <MotionReveal>
            <h3 className="text-xl font-semibold text-text-primary">{dictionary.applicationTitle}</h3>
            <div className="mt-6 space-y-5">{dictionary.applicationItems.map((item, index) => { const Icon = applicationIcons[index]; return <div key={item.title} className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-mint text-brand-hover"><Icon className="size-4.5" aria-hidden="true" /></span><div><h4 className="text-sm font-semibold text-text-primary">{item.title}</h4><p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p></div></div>; })}</div>
          </MotionReveal>

          <MotionReveal delay={0.08} y={20}>
            <figure className="mx-auto w-full max-w-[420px]">
              <Image src="/assets/education/happy-learner-campus.webp" alt={dictionary.imageAlt} width={1122} height={1402} sizes="(max-width: 1024px) 86vw, 32vw" className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
              <figcaption className="mt-3 text-center text-xs leading-5 text-text-secondary">{dictionary.photoCaption}</figcaption>
            </figure>
          </MotionReveal>

          <MotionReveal delay={0.14}>
            <h3 className="text-xl font-semibold text-text-primary">{dictionary.communityTitle}</h3>
            <div className="mt-6 space-y-5">{dictionary.communityItems.map((item, index) => { const Icon = communityIcons[index]; return <div key={item.title} className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#f3eadb] text-[#8a602f]"><Icon className="size-4.5" aria-hidden="true" /></span><div><h4 className="text-sm font-semibold text-text-primary">{item.title}</h4><p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p></div></div>; })}</div>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
