import { ArrowDownRight, CalendarCheck2, Check, Clock3, Languages, MessageCircleMore, Sparkles, UsersRound, Workflow } from "lucide-react";
import { Mockup } from "@/components/product/mockup";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { BookDemoForm } from "./book-demo-form";

const agendaIcons = [MessageCircleMore, Workflow, CalendarCheck2];
const fitIcons = [Check, UsersRound, MessageCircleMore, Sparkles, Clock3, Workflow];

export function BookDemoPage({
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["bookDemo"];
}) {
  return (
    <div className="overflow-hidden bg-white">
      <section className="relative isolate -mt-18 overflow-hidden bg-[#faf7ee] pb-16 pt-28 sm:pb-20 sm:pt-30">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -end-36 -top-48 size-[680px] rounded-full bg-brand/12 blur-3xl" />
          <span className="absolute -bottom-52 -start-28 size-[520px] rounded-full bg-[#e7b873]/16 blur-3xl" />
          <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
          <span className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-white" />
        </div>

        <Container className="grid max-w-[1320px] items-center gap-10 lg:grid-cols-[0.95fr_0.75fr] lg:gap-14">
          <div className="flex flex-col items-start gap-6">
            <MotionReveal delay={0.02}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-hover ring-1 ring-brand-dark/10 backdrop-blur-sm">
                <CalendarCheck2 className="size-3.5" aria-hidden="true" />
                {dictionary.hero.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <h1 className="max-w-[760px] text-4xl font-semibold leading-[1.02] tracking-[-0.052em] text-balance text-text-primary sm:text-5xl lg:text-[64px]">
                {dictionary.hero.headlineLead} <GradientText>{dictionary.hero.headlineAccent}</GradientText>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="max-w-2xl text-base leading-relaxed text-text-on-sand sm:text-lg">{dictionary.hero.description}</p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#book-demo-form" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-dark px-6 text-sm font-semibold text-white shadow-brand transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover">
                  {dictionary.hero.primaryCta}
                  <ArrowDownRight className="size-4 rtl:-rotate-90" aria-hidden="true" />
                </a>
                <a href="#book-demo-agenda" className="inline-flex h-12 items-center justify-center rounded-xl border border-brand-dark/15 bg-white/75 px-6 text-sm font-semibold text-text-primary transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover">
                  {dictionary.hero.secondaryCta}
                </a>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.26}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {dictionary.hero.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-sm text-text-on-sand">
                    <Check className="size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.16} y={20}>
            <Card id="book-demo-form" padding="lg" className="scroll-mt-24 border-brand/25 shadow-e3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.form.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl">{dictionary.form.title}</h2>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{dictionary.form.description}</p>
              <div className="mt-7">
                <BookDemoForm dictionary={dictionary.form} />
              </div>
            </Card>
          </MotionReveal>
        </Container>
      </section>

      <Section id="book-demo-agenda" spacing="lg" aria-labelledby="book-demo-agenda-title">
        <Container className="max-w-[1260px]">
          <MotionReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.agenda.eyebrow}</p>
              <h2 id="book-demo-agenda-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.agenda.title}</h2>
              <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.agenda.description}</p>
            </div>
          </MotionReveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.42fr_1fr] lg:items-start">
            <MotionReveal>
              <Mockup
                name="book-demo-agenda"
                alt={dictionary.agenda.imageAlt}
                ratio="4 / 5"
                sizes="(max-width: 1024px) 88vw, 34vw"
                className="mx-auto max-w-[420px] rounded-2xl border border-brand-dark/8 shadow-e1"
              />
            </MotionReveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {dictionary.agenda.items.map((item, index) => {
                const Icon = agendaIcons[index];
                return (
                  <MotionReveal key={item.title} delay={0.06 * index} className="h-full">
                    <Card padding="lg" className="h-full">
                      <span className="grid size-11 place-items-center rounded-2xl bg-surface-mint text-brand-hover"><Icon className="size-5" aria-hidden="true" /></span>
                      <h3 className="mt-5 text-base font-semibold text-text-primary">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
                    </Card>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mint" spacing="lg" decoration="grid" aria-labelledby="book-demo-fit-title">
        <Container className="grid max-w-[1260px] gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <MotionReveal>
            <h2 id="book-demo-fit-title" className="text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.fit.title}</h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.fit.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-hover">
              <Languages className="size-4" aria-hidden="true" />
              FR · AR · EN
            </div>
            <Mockup
              name="book-demo-hero"
              alt={dictionary.hero.imageAlt}
              ratio="5 / 4"
              sizes="(max-width: 1024px) 90vw, 34vw"
              className="mt-8 rounded-2xl shadow-e1"
            />
          </MotionReveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {dictionary.fit.items.map((item, index) => {
              const Icon = fitIcons[index];
              return (
                <MotionReveal key={item} delay={0.04 * index}>
                  <div className="flex gap-3 rounded-2xl border border-brand-dark/8 bg-white p-4 shadow-e1">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-mint text-brand-hover"><Icon className="size-4.5" aria-hidden="true" /></span>
                    <p className="text-sm leading-6 text-text-primary">{item}</p>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="forest" spacing="lg" decoration="grid" aria-labelledby="book-demo-expectations-title">
        <Container className="max-w-[1260px]">
          <MotionReveal>
            <h2 id="book-demo-expectations-title" className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{dictionary.expectations.title}</h2>
          </MotionReveal>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {dictionary.expectations.items.map((item, index) => (
              <MotionReveal key={item.title} delay={0.06 * index}>
                <article className="h-full rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
                  <span className="grid size-10 place-items-center rounded-full bg-brand-light text-sm font-bold text-brand-dark">{item.label}</span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/68">{item.description}</p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" aria-labelledby="book-demo-faq-title">
        <Container className="grid max-w-[1180px] gap-8 lg:grid-cols-[0.5fr_1fr] lg:items-start">
          <MotionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.faq.eyebrow}</p>
            <h2 id="book-demo-faq-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-text-primary sm:text-4xl">{dictionary.faq.title}</h2>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {dictionary.faq.items.map((item, index) => (
                <AccordionItem key={item.question} value={`book-demo-faq-${index}`} className="rounded-xl border-border/80 shadow-none data-[state=open]:shadow-none">
                  <AccordionTrigger className="px-4 py-3 text-sm font-semibold">{item.question}</AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm leading-6">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </MotionReveal>
        </Container>
      </Section>
    </div>
  );
}
