import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ClipboardList,
  Inbox,
  Languages,
  Megaphone,
  MessageCircleMore,
  MousePointerClick,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/product/mockup";
import { Card } from "@/components/ui/card";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

const platformIcons = [ShieldCheck, Inbox, Megaphone, Workflow, Bot, ClipboardList];
const workflowIcons = [MousePointerClick, Route, MessageCircleMore, Workflow, BarChart3];
const industryIcons = [Check, UsersRound, Megaphone, MessageCircleMore, Sparkles, ShieldCheck];
const principleIcons = [Check, UsersRound, Inbox, BarChart3];

export function AboutPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["about"];
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

        <Container className="grid max-w-[1360px] items-center gap-12 lg:grid-cols-[0.9fr_0.8fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <MotionReveal delay={0.02}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-hover ring-1 ring-brand-dark/10 backdrop-blur-sm">
                <Sparkles className="size-3.5" aria-hidden="true" />
                {dictionary.hero.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <h1 className="max-w-[780px] text-4xl font-semibold leading-[1.02] tracking-[-0.052em] text-balance text-text-primary sm:text-5xl lg:text-[64px]">
                {dictionary.hero.headlineLead} <GradientText>{dictionary.hero.headlineAccent}</GradientText>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="max-w-2xl text-base leading-relaxed text-text-on-sand sm:text-lg">{dictionary.hero.description}</p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
                  <Link href={localizedHref(locale, "/book-demo")}>
                    {dictionary.hero.primaryCta}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border-brand-dark/15 bg-white/75">
                  <Link href={localizedHref(locale, "/solutions")}>{dictionary.hero.secondaryCta}</Link>
                </Button>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.16} y={22}>
            <div className="rounded-[2rem] border border-brand-dark/10 bg-white/78 p-5 shadow-e3 backdrop-blur-sm sm:p-6">
              <Mockup
                name="about-hero"
                alt={dictionary.hero.imageAlt}
                ratio="3 / 2"
                sizes="(max-width: 1024px) 92vw, 40vw"
                priority
                className="mb-5 rounded-3xl"
              />
              <div className="rounded-3xl bg-brand-dark p-5 text-white sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-light">Dealup</p>
                    <p className="mt-2 text-2xl font-semibold tracking-[-0.035em]">WhatsApp workspace</p>
                  </div>
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-brand-light">
                    <MessageCircleMore className="size-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-6 grid gap-3">
                  {dictionary.hero.stats.map((stat, index) => (
                    <div key={stat.label} className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
                      <p className="text-xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-1 text-sm leading-5 text-white/64">{stat.label}</p>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <span className="block h-full rounded-full bg-brand-light" style={{ width: `${72 + index * 10}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </section>

      <Section spacing="lg" aria-labelledby="about-mission-title">
        <Container className="grid max-w-[1260px] gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <MotionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.mission.eyebrow}</p>
            <h2 id="about-mission-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">
              {dictionary.mission.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.mission.description}</p>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <Card padding="lg" className="border-brand/25 bg-surface-mint/60">
              <ul className="space-y-4">
                {dictionary.mission.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-text-primary">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          </MotionReveal>
        </Container>
      </Section>

      <Section tone="mint" spacing="lg" decoration="grid" aria-labelledby="about-platform-title">
        <Container className="max-w-[1280px]">
          <SectionHeader id="about-platform-title" eyebrow={dictionary.platform.eyebrow} headline={dictionary.platform.title} description={dictionary.platform.description} align="center" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dictionary.platform.items.map((item, index) => {
              const Icon = platformIcons[index];
              return (
                <MotionReveal key={item.title} delay={0.05 * index} className="h-full">
                  <Card padding="lg" className="h-full bg-white">
                    <span className="grid size-11 place-items-center rounded-2xl bg-surface-mint text-brand-hover">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
                  </Card>
                </MotionReveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" aria-labelledby="about-workflow-title">
        <Container className="max-w-[1280px]">
          <MotionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.workflow.eyebrow}</p>
            <div className="mt-3 grid gap-3 lg:grid-cols-[0.72fr_1fr] lg:items-end">
              <h2 id="about-workflow-title" className="text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">
                {dictionary.workflow.title}
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-text-secondary lg:justify-self-end">{dictionary.workflow.description}</p>
            </div>
          </MotionReveal>
          <div className="mt-9 grid gap-3 md:grid-cols-5">
            {dictionary.workflow.steps.map((step, index) => {
              const Icon = workflowIcons[index];
              return (
                <MotionReveal key={step.title} delay={0.05 * index} className="h-full">
                  <article className="h-full rounded-2xl border border-brand-dark/8 bg-[#f8faf6] p-4">
                    <span className="grid size-9 place-items-center rounded-xl bg-white text-brand-hover shadow-e1">
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-text-primary">{step.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-text-secondary">{step.description}</p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
          <MotionReveal delay={0.15}>
            <Mockup
              name="about-workflow"
              alt={dictionary.workflow.imageAlt}
              ratio="2 / 1"
              sizes="(max-width: 1280px) 94vw, 1280px"
              className="mt-8 rounded-2xl border border-brand-dark/8"
            />
          </MotionReveal>
        </Container>
      </Section>

      <Section tone="light" spacing="lg" aria-labelledby="about-industries-title">
        <Container className="max-w-[1280px]">
          <SectionHeader id="about-industries-title" eyebrow={dictionary.industries.eyebrow} headline={dictionary.industries.title} description={dictionary.industries.description} align="center" />
          <MotionReveal delay={0.08}>
            <Mockup
              name="about-industries"
              alt={dictionary.industries.imageAlt}
              ratio="3 / 2"
              sizes="(max-width: 1280px) 94vw, 1280px"
              className="mt-10 rounded-2xl"
            />
          </MotionReveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dictionary.industries.items.map((item, index) => {
              const Icon = industryIcons[index];
              return (
                <MotionReveal key={item.href} delay={0.05 * index} className="h-full">
                  <Card interactive padding="lg" className="group h-full">
                    <span className="grid size-11 place-items-center rounded-2xl bg-surface-mint text-brand-hover">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
                    <Link href={localizedHref(locale, item.href)} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-hover transition-colors group-hover:text-brand-dark">
                      {dictionary.hero.secondaryCta}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </Card>
                </MotionReveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="forest" spacing="lg" decoration="grid" aria-labelledby="about-principles-title">
        <Container className="grid max-w-[1280px] gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <MotionReveal>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-light">
              <Languages className="size-4" aria-hidden="true" />
              {dictionary.principles.eyebrow}
            </p>
            <h2 id="about-principles-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-white sm:text-4xl">
              {dictionary.principles.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/68">{dictionary.principles.description}</p>
            <Mockup
              name="about-principles"
              alt={dictionary.principles.imageAlt}
              ratio="4 / 5"
              sizes="(max-width: 1024px) 90vw, 30vw"
              className="mt-8 hidden rounded-2xl lg:block"
            />
          </MotionReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {dictionary.principles.items.map((item, index) => {
              const Icon = principleIcons[index];
              return (
                <MotionReveal key={item.title} delay={0.05 * index} className="h-full">
                  <article className="h-full rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
                    <Icon className="size-6 text-brand-light" aria-hidden="true" />
                    <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/64">{item.description}</p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" aria-labelledby="about-faq-title">
        <Container className="grid max-w-[1180px] gap-8 lg:grid-cols-[0.5fr_1fr] lg:items-start">
          <MotionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.faq.eyebrow}</p>
            <h2 id="about-faq-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-text-primary sm:text-4xl">{dictionary.faq.title}</h2>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {dictionary.faq.items.map((item, index) => (
                <AccordionItem key={item.question} value={`about-faq-${index}`} className="rounded-xl border-border/80 shadow-none data-[state=open]:shadow-none">
                  <AccordionTrigger className="px-4 py-3 text-sm font-semibold">{item.question}</AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm leading-6">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </MotionReveal>
        </Container>
      </Section>

      <Container className="max-w-[1280px] pb-12 md:pb-16">
        <MotionReveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-dark px-6 py-10 text-white shadow-e3 sm:px-10 lg:px-14 lg:py-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <span className="absolute -end-24 -top-40 size-96 rounded-full bg-brand/25 blur-3xl" />
              <span className="absolute -bottom-44 start-1/4 size-80 rounded-full bg-[#e7b873]/15 blur-3xl" />
              <span className="absolute inset-0 bg-grid-inverted mask-fade-edges" />
            </div>
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-light">{dictionary.finalCta.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-4xl">{dictionary.finalCta.title}</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">{dictionary.finalCta.description}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="inverted" className="rounded-xl px-7">
                  <Link href={localizedHref(locale, "/book-demo")}>
                    {dictionary.finalCta.primaryCta}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="rounded-xl border border-white/35 bg-transparent px-7 hover:bg-white/10">
                  <Link href={localizedHref(locale, "/solutions")}>{dictionary.finalCta.secondaryCta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </div>
  );
}
