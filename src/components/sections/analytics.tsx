import {
  Send,
  Eye,
  Reply,
  TrendingUp,
  Users2,
  Megaphone,
  Target,
  BarChart3,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Sparkline } from "@/components/product/sparkline";
import mockups from "@/lib/mockups.generated.json";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const metricIcons = [Send, Eye, Reply, TrendingUp, Users2, Megaphone];
const floatingIcons = [TrendingUp, Users2, Target];
const benefitIcons = [Eye, TrendingUp, Target, BarChart3];

/** Illustrative demo figures — see `analytics.note`. */
const demoValues = ["48.2K", "91%", "34%", "24%", "97%", "12"];
const demoTrends = ["+14%", "+6%", "+9%", "+3%", "+2%", "+4%"];
const demoShapes = [
  [4, 6, 5, 8, 7, 11, 13],
  [6, 7, 7, 9, 8, 10, 11],
  [3, 5, 4, 6, 8, 7, 10],
  [5, 6, 8, 7, 9, 10, 12],
  [8, 8, 9, 9, 10, 10, 11],
  [2, 4, 3, 6, 5, 8, 9],
];
const overviewShape = [3, 4, 4, 6, 5, 8, 9, 12, 14];

const shot = mockups["analytics-mockup"];

export function Analytics({ dictionary }: { dictionary: Dictionary["analytics"] }) {
  const { overview } = dictionary;

  return (
    <Section tone="white" spacing="lg">
      {/* Dotted field in the top corner, as in the reference composition. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-e-0 top-10 -z-10 hidden size-64 opacity-50 bg-[radial-gradient(var(--color-brand-dark)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_at_center,#000_20%,transparent_70%)] lg:block"
      />

      <Container className="flex flex-col gap-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          {/* ---------------- Left: copy, metrics, overview ---------------- */}
          <div className="flex flex-col gap-8">
            <MotionReveal x={-24} y={0}>
              <SectionHeader
                eyebrow={dictionary.eyebrow}
                headline={dictionary.headline}
                description={dictionary.description}
              />
            </MotionReveal>

            {/* Metric grid */}
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {dictionary.metrics.map((metric, index) => {
                const Icon = metricIcons[index];
                return (
                  <li key={metric}>
                    <MotionReveal delay={(index % 3) * 0.06} className="h-full">
                      <div className="group flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-white p-4 shadow-e1 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-e2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[11px] font-medium leading-tight text-text-secondary">
                            {metric}
                          </span>
                          <span
                            aria-hidden="true"
                            className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-mint text-brand-hover transition-colors duration-300 group-hover:bg-brand-dark group-hover:text-white"
                          >
                            <Icon className="size-3.5" />
                          </span>
                        </div>

                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-semibold tabular-nums text-text-primary">
                            {demoValues[index]}
                          </span>
                          {/* dir="ltr" keeps the sign on the number in Arabic. */}
                          <span
                            dir="ltr"
                            className="inline-block text-[11px] font-semibold tabular-nums text-brand-hover"
                          >
                            {demoTrends[index]}
                          </span>
                        </div>

                        <Sparkline points={demoShapes[index]} className="h-7" />
                      </div>
                    </MotionReveal>
                  </li>
                );
              })}
            </ul>

            {/* Overview banner */}
            <MotionReveal delay={0.2}>
              <div className="grid gap-5 rounded-2xl border border-brand/15 bg-surface-mint p-5 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] sm:items-center">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white shadow-brand"
                  >
                    <TrendingUp className="size-6" />
                  </span>

                  <span className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-medium text-text-secondary">
                      {overview.label}
                    </span>
                    <span className="flex flex-wrap items-baseline gap-2">
                      <span className="text-lg font-semibold text-text-primary">
                        {overview.title}
                      </span>
                      <span
                        dir="ltr"
                        className="inline-block text-2xl font-semibold tabular-nums text-brand-hover"
                      >
                        {overview.value}
                      </span>
                    </span>
                    <span className="text-[11px] leading-snug text-text-secondary">
                      {overview.caption}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-4 sm:border-s sm:border-brand/15 sm:ps-5">
                  <span className="flex shrink-0 flex-col gap-0.5">
                    <span className="text-[11px] font-medium text-text-secondary">
                      {overview.roiLabel}
                    </span>
                    <span
                      dir="ltr"
                      className="inline-block text-2xl font-semibold tabular-nums text-brand-hover"
                    >
                      {overview.roiValue}
                    </span>
                    <span className="text-[11px] leading-snug text-text-secondary">
                      {overview.roiCaption}
                    </span>
                  </span>

                  <Sparkline
                    points={overviewShape}
                    className="h-12 w-auto min-w-0 flex-1"
                  />
                </div>
              </div>
            </MotionReveal>

            {/* These are demo figures, not measured results — say so plainly. */}
            <p className="text-xs text-text-secondary">{dictionary.note}</p>
          </div>

          {/* ---------------- Right: dashboard + floating cards ---------------- */}
          <MotionReveal x={24} y={0} delay={0.1} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element --
                next.config sets images.unoptimized for static export, so
                next/image emits no srcset; these WebP variants are smaller. */}
            <img
              src={`/assets/${shot.base}-${shot.variants[shot.variants.length - 1]}.webp`}
              srcSet={shot.variants
                .map((w) => `/assets/${shot.base}-${w}.webp ${w}w`)
                .join(", ")}
              sizes="(min-width: 1024px) 48vw, 92vw"
              width={shot.width}
              height={shot.height}
              alt={dictionary.imageAlt}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full"
            />

            {/* Anchored physically, not logically: RTL mirrors the page layout
                but not the artwork, so these keep the same relationship to the
                screen in both directions. Hidden below lg, where they would
                cover the dashboard itself. */}
            {dictionary.floating.map((stat, index) => {
              const Icon = floatingIcons[index];
              const place = [
                "-top-4 right-0",
                "bottom-10 left-0",
                "bottom-10 right-0",
              ][index];
              return (
                <div
                  key={stat.label}
                  className={`pointer-events-none absolute ${place} hidden w-40 items-start gap-2.5 rounded-2xl border border-border/70 bg-white/95 p-3 shadow-e3 backdrop-blur-sm lg:flex`}
                >
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white"
                  >
                    <Icon className="size-4" />
                  </span>

                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[11px] font-medium leading-tight text-text-secondary">
                      {stat.label}
                    </span>
                    <span
                      dir="ltr"
                      className="inline-block text-xl font-semibold tabular-nums text-brand-hover"
                    >
                      {stat.value}
                    </span>
                    <span className="text-[10px] leading-tight text-text-secondary">
                      {stat.caption}
                    </span>
                  </span>
                </div>
              );
            })}
          </MotionReveal>
        </div>

        {/* ---------------- Bottom: benefit strip ---------------- */}
        <ul className="grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {dictionary.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index];
            return (
              <li key={benefit.title}>
                <MotionReveal
                  delay={index * 0.06}
                  className={
                    // Dividers between columns only, never a trailing rule.
                    index > 0 ? "lg:border-s lg:border-border lg:ps-8" : "lg:pe-8"
                  }
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-mint text-brand-hover"
                    >
                      <Icon className="size-5" />
                    </span>

                    <span className="flex flex-col gap-1">
                      <span className="font-semibold text-text-primary">
                        {benefit.title}
                      </span>
                      <span className="text-sm leading-relaxed text-text-secondary">
                        {benefit.description}
                      </span>
                    </span>
                  </div>
                </MotionReveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
