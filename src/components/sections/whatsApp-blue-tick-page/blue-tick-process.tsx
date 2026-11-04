import { ArrowRight, CheckCircle2, ClipboardCheck, FileSearch, Send } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { localizedHref } from "@/lib/i18n/path";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";

const STEP_ICONS = [FileSearch, ClipboardCheck, Send, CheckCircle2];

export function BlueTickProcess({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["whatsappBlueTick"]["process"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="blue-tick-process-title">
      <div className="overflow-hidden rounded-3xl bg-[#f5f8f6] p-6 ring-1 ring-border/70 sm:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
          <div>
            <SectionHeader
              id="blue-tick-process-title"
              eyebrow={dictionary.eyebrow}
              headline={dictionary.title}
              description={dictionary.description}
            />
            <Button asChild variant="secondary" className="mt-6 w-fit border-brand/30 bg-white">
              <a href={localizedHref(locale, "/#early-access")}>
                {dictionary.cta}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <MotionReveal delay={0.08}>
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[12%] bottom-[5%] -z-10 h-12 rounded-[50%] bg-brand-dark/15 blur-2xl"
              />
              <Image
                src="/assets/whatsapp-blue-tick/eligibility-dashboard-cutout.png"
                alt={dictionary.imageAlt}
                width={1535}
                height={1024}
                sizes="(max-width: 1024px) 88vw, 48vw"
                className="h-auto w-full drop-shadow-[0_22px_30px_rgba(6,64,47,0.14)]"
              />
            </div>
          </MotionReveal>
        </div>

        <ol className="relative mt-8 grid gap-4 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute inset-x-[11%] top-5 hidden border-t border-dashed border-brand/35 lg:block"
          />
          {dictionary.items.map((item, index) => {
            const Icon = STEP_ICONS[index];
            return (
              <li key={item.title} className="relative">
                <MotionReveal delay={index * 0.07} className="h-full">
                  <article className="h-full rounded-2xl border border-border/80 bg-white p-5 shadow-e1">
                    <div className="flex items-center gap-3">
                      <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-brand-dark text-white shadow-md shadow-brand-dark/15">
                        <Icon className="size-4.5" strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-hover">
                        {dictionary.stepLabel} {index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
                  </article>
                </MotionReveal>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-xs leading-5 text-text-secondary">{dictionary.disclaimer}</p>
      </div>
    </Section>
  );
}
