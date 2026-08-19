import Link from "next/link";
import {
  Megaphone,
  MessageCircle,
  Bot,
  UserCheck,
  Users,
  Trophy,
  Zap,
  BrainCircuit,
  UserSearch,
  LineChart,
  Handshake,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Check,
  MessageSquare,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Button } from "@/components/ui/button";
import mockups from "@/lib/mockups.generated.json";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Feature cards, in dictionary order. */
const featureIcons = [Zap, BrainCircuit, UserSearch, LineChart, Handshake, TrendingUp];
/** Funnel steps, in dictionary order. */
const funnelIcons = [Megaphone, MessageCircle, Bot, UserCheck, Users, Trophy];
/** Floating stat cards, in dictionary order. */
const statIcons = [MessageSquare, TrendingUp];

const shot = mockups["click-to-whatsapp"];

export function ClickToWhatsapp({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["clickToWhatsapp"];
}) {
  return (
    <Section tone="white" spacing="lg">
      {/* Soft brand bloom behind the composition, as in the reference. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-0 top-0 -z-10 size-160 max-w-full translate-x-1/4 -translate-y-1/4 rounded-full bg-brand/8 blur-3xl"
      />

      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
        {/* ---------------- Left: copy, features, journey, CTAs ---------------- */}
        <div className="flex flex-col gap-8">
          <MotionReveal x={-24} y={0} className="flex flex-col gap-5">
            <SectionHeader
              eyebrow={dictionary.eyebrow}
              headline={dictionary.headline}
              highlight={dictionary.highlight}
            />

            <p className="max-w-xl leading-relaxed text-text-secondary">
              {dictionary.descriptionParts.map((part, index) =>
                part.bold ? (
                  <strong key={index} className="font-semibold text-text-primary">
                    {part.text}
                  </strong>
                ) : (
                  <span key={index}>{part.text}</span>
                )
              )}
            </p>
          </MotionReveal>

          {/* Feature grid */}
          <MotionReveal x={-24} y={0} delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {dictionary.features.map((feature, index) => {
                const Icon = featureIcons[index];
                return (
                  <li
                    key={feature.title}
                    className="group flex h-full flex-col gap-2 rounded-2xl border border-border/70 bg-white p-4 shadow-e1 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-e2"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-mint text-brand-hover transition-colors duration-300 group-hover:bg-brand-dark group-hover:text-white"
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="text-sm font-semibold text-text-primary">
                      {feature.title}
                    </span>
                    <span className="text-xs leading-relaxed text-text-secondary">
                      {feature.description}
                    </span>
                  </li>
                );
              })}
            </ul>
          </MotionReveal>

          {/* Journey */}
          <MotionReveal x={-24} y={0} delay={0.16} className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover">
              {dictionary.journeyLabel}
            </span>

            {/* Ordered because the sequence is the message. The rail is
                decorative and sits behind the numbered markers. */}
            <ol className="relative grid grid-cols-3 gap-y-6 sm:grid-cols-6 sm:gap-2">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-5 hidden border-t border-dashed border-brand/35 sm:block"
              />

              {dictionary.funnel.map((step, index) => {
                const Icon = funnelIcons[index];
                const isLast = index === dictionary.funnel.length - 1;
                return (
                  <li key={step} className="relative flex flex-col items-center gap-1.5 text-center">
                    <span
                      aria-hidden="true"
                      className={
                        isLast
                          ? "grid size-10 shrink-0 place-items-center rounded-full bg-brand-dark text-white ring-4 ring-white"
                          : "grid size-10 shrink-0 place-items-center rounded-full border border-border/70 bg-white text-brand-hover ring-4 ring-white"
                      }
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="text-[10px] font-semibold tabular-nums text-text-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] font-medium leading-tight text-balance text-text-primary">
                      {step}
                    </span>
                  </li>
                );
              })}
            </ol>
          </MotionReveal>

          {/* Actions */}
          <MotionReveal x={-24} y={0} delay={0.24} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg">
                <Link href={localizedHref(locale, "/get-started")}>
                  {dictionary.primaryCta}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </Button>

              <Link
                href={localizedHref(locale, "/book-demo")}
                className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-text-primary underline underline-offset-4 transition-colors hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
              >
                {dictionary.secondaryCta}
                <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>

            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-secondary">
              {dictionary.reassurances.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>

        {/* ---------------- Right: composition + floating stats ---------------- */}
        <MotionReveal x={24} y={0} delay={0.1} className="relative">
          {/* The PNG already carries the phone, the customer, the dashed arrow
              and the "order confirmed" toast as one transparent composition,
              so nothing here re-frames it. */}
          {/* eslint-disable-next-line @next/next/no-img-element --
              next.config sets images.unoptimized for static export, so
              next/image emits no srcset; these WebP variants are smaller. */}
          <img
            src={`/assets/${shot.base}-${shot.variants[shot.variants.length - 1]}.webp`}
            srcSet={shot.variants
              .map((w) => `/assets/${shot.base}-${w}.webp ${w}w`)
              .join(", ")}
            sizes="(min-width: 1024px) 46vw, 92vw"
            width={shot.width}
            height={shot.height}
            alt={dictionary.imageAlt}
            loading="lazy"
            decoding="async"
            className="mx-auto h-auto w-full max-w-lg lg:max-w-none"
          />

          {/* Anchored with physical `right`, not logical `end`: RTL mirrors the
              page layout but not the artwork, so the phone stays on the image's
              physical left in both directions. Using `end` would drop these
              cards straight on top of the conversation in Arabic.
              Hidden below lg, where they would cover the customer's face. */}
          <div className="pointer-events-none absolute right-0 top-1/4 hidden w-44 flex-col overflow-hidden rounded-2xl border border-border/70 bg-white/95 shadow-e3 backdrop-blur-sm lg:flex">
            {dictionary.stats.map((stat, index) => {
              const Icon = statIcons[index];
              return (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 p-3.5 not-first:border-t not-first:border-border/70"
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="grid size-6 shrink-0 place-items-center rounded-full bg-surface-mint text-brand-hover"
                    >
                      <Icon className="size-3" />
                    </span>
                    <span className="text-[11px] font-medium leading-tight text-text-secondary">
                      {stat.label}
                    </span>
                  </span>

                  {/* dir="ltr" keeps the sign attached to the number: bidi
                      reordering otherwise renders "+24%" as "24%+" in Arabic. */}
                  <span
                    dir="ltr"
                    className="inline-block text-2xl font-semibold tabular-nums text-brand-hover"
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-text-secondary">{stat.caption}</span>
                </div>
              );
            })}
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
