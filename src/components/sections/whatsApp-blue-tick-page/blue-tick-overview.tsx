import { BadgeCheck, MessageCircleMore, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function BlueTickOverview({
  dictionary,
}: {
  dictionary: Dictionary["whatsappBlueTick"]["overview"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="blue-tick-overview-title">
      <Container className="max-w-[1280px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <MotionReveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover">
                {dictionary.eyebrow}
              </p>
              <h2
                id="blue-tick-overview-title"
                className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl lg:text-[44px] lg:leading-[1.1]"
              >
                {dictionary.title} <GradientText>{dictionary.highlight}</GradientText>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary">
                {dictionary.description}
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand/20 bg-surface-mint/70 p-4">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-hover" aria-hidden="true" />
                <p className="text-sm leading-6 text-text-secondary">{dictionary.note}</p>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="rounded-3xl border border-border/80 bg-[#f8faf9] p-4 shadow-e2 sm:p-6">
              <Image
                src="/assets/whatsapp-blue-tick/verified-comparison-cutout.png"
                alt={dictionary.imageAlt}
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 92vw, 48vw"
                className="mx-auto h-auto w-full max-w-[640px]"
              />

              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <article className="relative overflow-hidden rounded-2xl border border-[#b8d8ff] bg-white p-4 shadow-e1">
                  <span className="absolute inset-x-0 top-0 h-1 bg-[#2f80ed]" />
                  <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eaf3ff] text-[#236cc7]">
                      <BadgeCheck className="size-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">{dictionary.verifiedTitle}</h3>
                      <p className="mt-1 text-xs leading-5 text-text-secondary">{dictionary.verifiedDescription}</p>
                    </div>
                  </div>
                </article>

                <article className="rounded-2xl border border-border bg-white p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#f0f2f1] text-text-secondary">
                      <MessageCircleMore className="size-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">{dictionary.standardTitle}</h3>
                      <p className="mt-1 text-xs leading-5 text-text-secondary">{dictionary.standardDescription}</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
