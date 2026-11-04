import Image from "next/image";
import { CheckCircle2, HeartHandshake, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function AiDealUpHumanStory({
  dictionary,
}: {
  dictionary: Dictionary["aiDealUp"]["humanStory"];
}) {
  return (
    <Section tone="mint" spacing="lg" decoration="glow" aria-labelledby="aidealup-human-title">
      <Container className="max-w-[1280px]">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-brand-dark/10 bg-white shadow-e3 lg:grid-cols-[1fr_1fr]">
          <MotionReveal className="h-full">
            <div className="relative min-h-[380px] h-full lg:min-h-[560px]">
              <Image
                src="/assets/aidealup/hiring-team-success.webp"
                alt={dictionary.imageAlt}
                fill
                sizes="(max-width: 1024px) 94vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand-dark/85 to-transparent p-6 pt-24 text-white sm:p-8">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <HeartHandshake className="size-5 text-brand-light" aria-hidden="true" />
                  {dictionary.photoCaption}
                </p>
              </div>
            </div>
          </MotionReveal>

          <div className="p-7 sm:p-10 lg:pe-12 lg:ps-4">
            <MotionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-hover">{dictionary.eyebrow}</p>
              <h2 id="aidealup-human-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl lg:text-[44px] lg:leading-[1.08]">
                {dictionary.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-text-secondary sm:text-lg">{dictionary.description}</p>
            </MotionReveal>

            <ul className="mt-7 space-y-4">
              {dictionary.points.map((point, index) => (
                <MotionReveal key={point} delay={0.06 * index}>
                  <li className="flex items-start gap-3 text-sm leading-6 text-text-primary">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-hover" aria-hidden="true" />
                    {point}
                  </li>
                </MotionReveal>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-ai-soft p-4 text-ai-dark">
              <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <p className="text-sm leading-6">{dictionary.note}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
