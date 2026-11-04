import Image from "next/image";
import { ArrowRight, Bot, Check, MessagesSquare, UserRoundCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

export function EcommerceAutomation({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["ecommerceSolution"]["automation"];
}) {
  return (
    <>
      <Section spacing="lg" aria-labelledby="ecommerce-automation-title">
        <Container className="max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-center lg:gap-12">
            <MotionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.eyebrow}</p>
              <h2 id="ecommerce-automation-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.title}</h2>
              <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.description}</p>
              <Button asChild variant="secondary" className="mt-7 border-brand/35">
                <a href={localizedHref(locale, "/#early-access")}>{dictionary.cta}<ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" /></a>
              </Button>
            </MotionReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {dictionary.routes.map((route, index) => {
                const Icon = index === 0 ? Bot : UserRoundCheck;
                return (
                  <MotionReveal key={route.title} delay={0.06 * index} className="h-full">
                    <article className="h-full rounded-3xl border border-border/80 bg-[#fbfbf8] p-6 shadow-e1">
                      <span className={index === 0 ? "grid size-11 place-items-center rounded-2xl bg-surface-mint text-brand-hover" : "grid size-11 place-items-center rounded-2xl bg-ai-soft text-ai-dark"}><Icon className="size-5.5" aria-hidden="true" /></span>
                      <h3 className="mt-5 text-xl font-semibold text-text-primary">{route.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">{route.description}</p>
                      <div className="mt-5 space-y-2.5 rounded-2xl bg-white p-4 ring-1 ring-border/70">
                        {route.messages.map((message, messageIndex) => <div key={message} className={messageIndex % 2 === 0 ? "me-6 rounded-xl bg-surface-mint px-3 py-2 text-[11px] leading-5 text-brand-dark" : "ms-6 rounded-xl bg-[#f2f1ee] px-3 py-2 text-[11px] leading-5 text-text-secondary"}>{message}</div>)}
                      </div>
                    </article>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mint" spacing="lg" decoration="grid" aria-labelledby="ecommerce-builder-title">
        <Container className="max-w-[1360px]">
          <div className="grid items-center gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-12">
            <MotionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.builderEyebrow}</p>
              <h2 id="ecommerce-builder-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.builderTitle}</h2>
              <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.builderDescription}</p>
              <ul className="mt-6 space-y-3">{dictionary.builderPoints.map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary"><Check className="mt-1 size-4 shrink-0 text-brand-hover" aria-hidden="true" />{point}</li>)}</ul>
              <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ai-dark"><MessagesSquare className="size-4" aria-hidden="true" />{dictionary.builderNote}</div>
            </MotionReveal>
            <MotionReveal delay={0.1} y={20}>
              <Image
                src="/assets/ecommerce/automation-handoff-mockup.webp"
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
    </>
  );
}
