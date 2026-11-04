import { Check, Languages, Route, ShieldCheck, UserRoundCheck, UsersRound } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [UsersRound, Route, Languages, ShieldCheck];

export function RealEstateTeam({
  dictionary,
}: {
  dictionary: Dictionary["realEstateSolution"]["team"];
}) {
  return (
    <Section tone="forest" spacing="lg" decoration="grid" aria-labelledby="real-estate-team-title">
      <Container className="max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <MotionReveal>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-light"><UserRoundCheck className="size-4" aria-hidden="true" />{dictionary.eyebrow}</p>
            <h2 id="real-estate-team-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-white sm:text-4xl">{dictionary.title}</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/68">{dictionary.description}</p>
            <ul className="mt-7 space-y-3">{dictionary.points.map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-6 text-white/82"><Check className="mt-1 size-4 shrink-0 text-brand-light" aria-hidden="true" />{point}</li>)}</ul>
          </MotionReveal>

          <div className="grid gap-px overflow-hidden rounded-3xl bg-white/12 sm:grid-cols-2">
            {dictionary.benefits.map((item, index) => { const Icon = icons[index]; return (
              <MotionReveal key={item.title} delay={0.05 * index} className="h-full bg-brand-dark">
                <article className="h-full p-6 sm:p-7">
                  <Icon className="size-6 text-brand-light" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/64">{item.description}</p>
                </article>
              </MotionReveal>
            ); })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
