import { ArrowRight, BookOpenCheck, CalendarCheck2, FileCheck2, GraduationCap, Headphones, MessageCircleQuestion, Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Search, MessageCircleQuestion, BookOpenCheck, FileCheck2, CalendarCheck2, GraduationCap, Headphones];

export function EducationJourney({
  dictionary,
}: {
  dictionary: Dictionary["educationSolution"]["journey"];
}) {
  return (
    <Section id="education-journey" spacing="lg" aria-labelledby="education-journey-title">
      <Container className="max-w-[1360px]">
        <MotionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.eyebrow}</p>
          <div className="mt-3 grid gap-3 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <h2 id="education-journey-title" className="text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.title}</h2>
            <p className="max-w-2xl text-sm leading-6 text-text-secondary lg:justify-self-end">{dictionary.description}</p>
          </div>
        </MotionReveal>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {dictionary.items.map((item, index) => { const Icon = icons[index]; return (
            <MotionReveal key={item.title} delay={0.04 * index} className="h-full">
              <article className="relative flex h-full flex-col rounded-2xl border border-brand-dark/8 bg-[#f8faf6] p-4">
                <span className="grid size-9 place-items-center rounded-xl bg-white text-brand-hover shadow-e1"><Icon className="size-4.5" aria-hidden="true" /></span>
                <h3 className="mt-4 text-sm font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p>
                {index < dictionary.items.length - 1 ? <ArrowRight aria-hidden="true" className="absolute -end-2.5 top-7 z-10 hidden size-4 text-brand/45 rtl:rotate-180 lg:block" /> : null}
              </article>
            </MotionReveal>
          ); })}
        </div>
      </Container>
    </Section>
  );
}
