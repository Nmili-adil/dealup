import Image from "next/image";
import { Clock3, Layers3, UserCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Clock3, Layers3, UserCheck];

export function AiDealUpProblem({
  dictionary,
}: {
  dictionary: Dictionary["aiDealUp"]["problem"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="aidealup-problem-title">
      <Container className="max-w-[1280px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <MotionReveal>
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] bg-surface-mint shadow-e3 ring-1 ring-brand-dark/10">
                <Image
                  src="/assets/aidealup/happy-recruiter.webp"
                  alt={dictionary.imageAlt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 end-4 max-w-[260px] rounded-2xl border border-white/70 bg-brand-dark p-4 text-white shadow-e3 sm:end-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-light">{dictionary.calloutLabel}</p>
                <p className="mt-1.5 text-sm leading-5 text-white/80">{dictionary.callout}</p>
              </div>
            </div>
          </MotionReveal>

          <div>
            <MotionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-hover">{dictionary.eyebrow}</p>
              <h2 id="aidealup-problem-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl lg:text-[44px] lg:leading-[1.08]">
                {dictionary.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">{dictionary.description}</p>
            </MotionReveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {dictionary.items.map((item, index) => {
                const Icon = icons[index];
                return (
                  <MotionReveal key={item.title} delay={0.06 * index}>
                    <div className="grid h-full grid-cols-[auto_1fr] gap-4 rounded-2xl border border-border/75 bg-white p-4 shadow-e1">
                      <span className="grid size-10 place-items-center rounded-xl bg-surface-mint text-brand-hover">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-text-primary">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-text-secondary">{item.description}</p>
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
