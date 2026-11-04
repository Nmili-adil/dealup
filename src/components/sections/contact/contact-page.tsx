import Link from "next/link";
import { ArrowDownRight, ArrowRight, Check, CircleHelp, Headphones, Languages, MessageCircleMore, ReceiptText, Send, Sparkles, Tags, Workflow } from "lucide-react";
import { Mockup } from "@/components/product/mockup";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";
import { ContactForm } from "./contact-form";

const pathIcons = [MessageCircleMore, ReceiptText, Headphones];
const topicIcons = [Sparkles, MessageCircleMore, Send, Workflow, CircleHelp, Tags];
const expectationIcons = [ReceiptText, Send, Workflow];

export function ContactPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["contact"];
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
                <Headphones className="size-3.5" aria-hidden="true" />
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
                <a href="#contact-form" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-dark px-6 text-sm font-semibold text-white shadow-brand transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover">
                  {dictionary.hero.primaryCta}
                  <ArrowDownRight className="size-4 rtl:-rotate-90" aria-hidden="true" />
                </a>
                <a href="#contact-paths" className="inline-flex h-12 items-center justify-center rounded-xl border border-brand-dark/15 bg-white/75 px-6 text-sm font-semibold text-text-primary transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover">
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
            <Card id="contact-form" padding="lg" className="scroll-mt-24 border-brand/25 shadow-e3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.form.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl">{dictionary.form.title}</h2>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{dictionary.form.description}</p>
              <div className="mt-7">
                <ContactForm dictionary={dictionary.form} />
              </div>
            </Card>
          </MotionReveal>
        </Container>
      </section>

      <Section id="contact-paths" spacing="lg" aria-labelledby="contact-paths-title">
        <Container className="max-w-[1260px]">
          <SectionHeader id="contact-paths-title" eyebrow={dictionary.paths.eyebrow} headline={dictionary.paths.title} description={dictionary.paths.description} align="center" />
          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.7fr)] lg:items-stretch">
            <MotionReveal delay={0.08} className="h-full">
              <div className="relative h-full overflow-hidden rounded-2xl border border-brand-dark/8 bg-[#fbf8ef] p-3 shadow-e2 sm:p-5">
                <span aria-hidden="true" className="absolute -end-24 -top-28 size-72 rounded-full bg-brand/12 blur-3xl" />
                <span aria-hidden="true" className="absolute -bottom-24 start-8 size-56 rounded-full bg-[#e7b873]/18 blur-3xl" />
                <Mockup
                  name="contact-paths"
                  alt={dictionary.paths.imageAlt}
                  ratio="1325 / 1060"
                  sizes="(max-width: 1024px) 94vw, 760px"
                  className="relative z-10 rounded-xl object-contain object-center lg:h-full lg:min-h-full lg:object-cover"
                />
              </div>
            </MotionReveal>

            <div className="grid gap-3">
              {dictionary.paths.items.map((item, index) => {
                const Icon = pathIcons[index];
                return (
                  <MotionReveal key={item.href} delay={0.06 * index} className="h-full">
                    <Card interactive padding="none" className="group h-full overflow-hidden">
                      <Link
                        href={localizedHref(locale, item.href)}
                        className="relative flex h-full min-h-[154px] flex-col justify-between p-5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:p-6"
                      >
                        <span aria-hidden="true" className="absolute end-5 top-4 text-5xl font-semibold leading-none text-brand-dark/[0.045] transition-colors group-hover:text-brand/[0.12]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="relative flex items-start gap-4">
                          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-mint text-brand-hover ring-1 ring-brand-dark/8 transition-colors group-hover:bg-brand group-hover:text-white">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-base font-semibold text-text-primary">{item.title}</span>
                            <span className="mt-2 block text-sm leading-6 text-text-secondary">{item.description}</span>
                          </span>
                        </span>
                        <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-hover transition-colors group-hover:text-brand-dark">
                          {item.cta}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
                        </span>
                        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-brand via-brand-hover to-[#e7b873] opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </Card>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mint" spacing="lg" decoration="grid" aria-labelledby="contact-topics-title">
        <Container className="grid max-w-[1260px] gap-10 lg:grid-cols-[0.65fr_1fr] lg:items-start">
          <MotionReveal>
            <h2 id="contact-topics-title" className="text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">{dictionary.topics.title}</h2>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-hover">
              <Languages className="size-4" aria-hidden="true" />
              FR · AR · EN
            </div>
            <Mockup
              name="contact-hero"
              alt={dictionary.hero.imageAlt}
              ratio="3 / 2"
              sizes="(max-width: 1024px) 90vw, 34vw"
              className="mt-8 rounded-2xl shadow-e1"
            />
          </MotionReveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {dictionary.topics.items.map((item, index) => {
              const Icon = topicIcons[index];
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

      <Section tone="forest" spacing="lg" decoration="grid" aria-labelledby="contact-expectations-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -start-24 top-10 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
          <span className="absolute end-0 bottom-0 h-72 w-72 rounded-full bg-[#e7b873]/12 blur-3xl" />
        </div>
        <Container className="max-w-[1260px]">
          <div className="grid gap-6 lg:grid-cols-[0.42fr_1fr] lg:items-end">
            <MotionReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-light">Dealup</p>
              <h2 id="contact-expectations-title" className="mt-3 max-w-sm text-3xl font-semibold tracking-[-0.04em] text-balance text-white sm:text-4xl">{dictionary.expectations.title}</h2>
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <div className="hidden h-px bg-linear-to-r from-white/5 via-white/25 to-white/5 lg:block" />
            </MotionReveal>
          </div>

          <ol className="relative mt-10 grid gap-4 md:grid-cols-3">
            <span aria-hidden="true" className="absolute start-[16%] end-[16%] top-10 hidden h-px bg-linear-to-r from-transparent via-brand-light/45 to-transparent md:block" />
            {dictionary.expectations.items.map((item, index) => {
              const Icon = expectationIcons[index] ?? Check;
              return (
                <MotionReveal key={item.title} delay={0.06 * index} className="h-full">
                  <li className="relative h-full">
                    <article className="group relative h-full overflow-hidden rounded-2xl border border-white/14 bg-white/[0.075] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors duration-200 hover:border-brand-light/55 hover:bg-white/[0.095]">
                      <span aria-hidden="true" className="absolute -end-2 -top-4 text-[88px] font-semibold leading-none text-white/[0.055]">{item.label}</span>
                      <div className="relative z-10 flex items-center gap-3">
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand-light/30 bg-brand-light/16 text-brand-light shadow-[0_0_0_6px_rgba(32,198,106,0.06)]">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="grid size-8 place-items-center rounded-full bg-white text-sm font-bold text-brand-dark">{item.label}</span>
                      </div>
                      <h3 className="relative z-10 mt-6 text-lg font-semibold leading-snug text-white">{item.title}</h3>
                      <p className="relative z-10 mt-2 text-sm leading-6 text-white/74">{item.description}</p>
                      <span aria-hidden="true" className="absolute inset-x-6 bottom-0 h-0.5 rounded-full bg-linear-to-r from-brand-light via-white/70 to-[#e7b873]" />
                    </article>
                  </li>
                </MotionReveal>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Section spacing="lg" aria-labelledby="contact-faq-title">
        <Container className="grid max-w-[1180px] gap-8 lg:grid-cols-[0.5fr_1fr] lg:items-start">
          <MotionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.faq.eyebrow}</p>
            <h2 id="contact-faq-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-text-primary sm:text-4xl">{dictionary.faq.title}</h2>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {dictionary.faq.items.map((item, index) => (
                <AccordionItem key={item.question} value={`contact-faq-${index}`} className="rounded-xl border-border/80 shadow-none data-[state=open]:shadow-none">
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
