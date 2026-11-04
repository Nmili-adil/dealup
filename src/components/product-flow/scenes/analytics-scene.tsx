"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { AnimatedNumber } from "../animated-number";
import { FLOW_DATA, FLOW_EASE } from "../flow-stages";
import { Chip, Rise, ScreenFrame } from "./scene-parts";
import type { FlowCopy } from "../flow-copy";

/** Seven-day series behind the chart. Rising, but not implausibly. */
const SERIES = [38, 45, 41, 54, 58, 67, 76];
const MAX = 92;

const LINE = SERIES.map((v, i) => `${(i / (SERIES.length - 1)) * 100},${100 - (v / MAX) * 100}`).join(" ");
const AREA = `0,100 ${LINE} 100,100`;

/** Per-KPI sparkline series, drawn in a 100x100 box. */
const SPARKS = [
  [60, 62, 61, 66, 70, 74, 78],
  [30, 38, 34, 47, 55, 64, 76],
  [44, 48, 45, 52, 58, 62, 70],
  [22, 28, 33, 30, 44, 55, 68],
];
const spark = (series: number[]) =>
  series.map((v, i) => `${(i / (series.length - 1)) * 100},${100 - v}`).join(" ");

/** Funnel bars, as a share of the first stage. */
const FUNNEL_SHARE = [1, 0.988, 0.897, 0.758, 0.66];

/** One categorical ramp for the whole screen, so a hue means the same thing
 *  wherever it appears. Drawn from the shared --chart-* tokens. */
const SERIES_COLOR = ["text-chart-1", "text-chart-2", "text-chart-3", "text-chart-4"];
const SERIES_BG = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4"];
/** Sent and delivered share the first hue; the journey then moves through it. */
const FUNNEL_BG = ["bg-chart-1", "bg-chart-1", "bg-chart-4", "bg-chart-2", "bg-chart-3"];

/**
 * Chapter 05 — the payoff. Figures count up and the curve draws itself, then
 * the closing line lands.
 */
export function AnalyticsScene({
  copy,
  ui,
  locale,
  beat,
}: {
  copy: FlowCopy["analytics"];
  ui: FlowCopy["ui"];
  locale: string;
  beat: number;
}) {
  const counting = beat >= 2;

  const metrics = [
    { label: copy.deliveredLabel, value: FLOW_DATA.deliveryRate, decimals: 1, suffix: "%", prefix: "" },
    { label: copy.repliesLabel, value: FLOW_DATA.replies, decimals: 0, suffix: "", prefix: "" },
    { label: copy.confirmedLabel, value: FLOW_DATA.confirmed, decimals: 0, suffix: "%", prefix: "" },
    { label: copy.conversionLabel, value: FLOW_DATA.conversionLift, decimals: 0, suffix: "%", prefix: "+" },
  ];

  return (
    <ScreenFrame title={copy.panelTitle} active={4} trailing={<Chip>{copy.range}</Chip>}>
      <div className="flex h-full flex-col gap-[0.7em]">
        <div className="grid grid-cols-4 gap-[0.5em]">
          {metrics.map((metric, i) => (
            <Rise key={metric.label} delay={0.05 + i * 0.07} className="rounded-[0.5em] border border-black/6 bg-white px-[0.6em] py-[0.5em]">
              <p className="text-[0.62em] text-text-secondary">{metric.label}</p>
              <p className="mt-[0.15em] text-[1.15em] font-semibold leading-none tracking-tight text-text-primary">
                <AnimatedNumber
                  value={metric.value}
                  locale={locale}
                  active={counting}
                  decimals={metric.decimals}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  duration={1200}
                />
              </p>
              <p className="mt-[0.2em] text-[0.55em] text-text-secondary">{ui.compare}</p>
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                className={cn("mt-[0.3em] h-[1.6em] w-full rtl:-scale-x-100", SERIES_COLOR[i])}
              >
                <motion.polyline
                  points={spark(SPARKS[i])}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: counting ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                />
              </svg>
            </Rise>
          ))}
        </div>

        <Rise delay={0.22} className="rounded-[0.5em] border border-black/6 bg-white px-[0.7em] py-[0.5em]">
          <span className="text-[0.6em] font-semibold uppercase tracking-[0.1em] text-text-secondary">
            {copy.funnelLabel}
          </span>
          <div className="mt-[0.35em] grid grid-cols-5 gap-[0.5em]">
            {copy.funnel.map((stage, i) => (
              <span key={stage.label} className="flex flex-col gap-[0.2em]">
                <span className="flex items-baseline justify-between gap-[0.3em]">
                  <span className="truncate text-[0.58em] text-text-secondary">{stage.label}</span>
                  <span dir="ltr" className="shrink-0 text-[0.66em] font-semibold tabular-nums">
                    {stage.value}
                  </span>
                </span>
                <span className="h-[0.4em] overflow-hidden rounded-full bg-black/6">
                  <motion.span
                    className={cn("block h-full rounded-full", FUNNEL_BG[i])}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: counting ? FUNNEL_SHARE[i] : 0 }}
                    transition={{ duration: 0.9, delay: 0.35 + i * 0.1, ease: FLOW_EASE }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
              </span>
            ))}
          </div>
        </Rise>

        <div className="grid min-h-0 flex-1 grid-cols-[1.55fr_1fr] gap-[0.6em]">
          <Rise delay={0.28} className="relative flex min-h-0 flex-col rounded-[0.5em] border border-black/6 bg-white p-[0.7em]">
            <span className="mb-[0.4em] text-[0.62em] font-semibold uppercase tracking-[0.1em] text-text-secondary">
              {copy.trendLabel}
            </span>
            <div className="relative min-h-0 flex-1">
              {/* Mirrored as a whole in RTL so the axis and the curve stay together. */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="size-full text-chart-1 rtl:-scale-x-100"
                aria-hidden="true"
              >
                {/* Wiped in left to right with a clip rect rather than `pathLength`:
                    the viewBox is stretched non-uniformly, which distorts the
                    dash-array `pathLength` relies on and breaks the line into gaps. */}
                <defs>
                  <clipPath id="flow-chart-reveal" clipPathUnits="userSpaceOnUse">
                    <motion.rect
                      x="0"
                      y="-10"
                      height="120"
                      initial={{ width: 0 }}
                      animate={{ width: counting ? 100 : 0 }}
                      transition={{ duration: 1.3, ease: FLOW_EASE }}
                    />
                  </clipPath>
                </defs>
                {[25, 50, 75].map((y) => (
                  <line key={y} x1="0" y1={y} x2="100" y2={y} className="stroke-black/6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                ))}
                <g clipPath="url(#flow-chart-reveal)">
                  <polygon points={AREA} className="fill-chart-1/12" />
                  <polyline
                    points={LINE}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </svg>
            </div>
            <span className="mt-[0.35em] flex justify-between text-[0.55em] tabular-nums text-text-secondary">
              {copy.days.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </span>
          </Rise>

          {/* Where the replies came from, so the chart is not alone. */}
          <Rise delay={0.4} className="flex min-h-0 flex-col overflow-hidden rounded-[0.5em] border border-black/6 bg-white">
            <span className="border-b border-black/6 px-[0.7em] py-[0.45em] text-[0.62em] font-semibold uppercase tracking-[0.1em] text-text-secondary">
              {copy.breakdownLabel}
            </span>
            <div className="flex flex-col gap-[0.5em] border-b border-black/6 p-[0.7em]">
              {copy.breakdown.map((row, i) => (
                <span key={row.label} className="flex flex-col gap-[0.25em]">
                  <span className="flex items-center justify-between">
                    <span className="flex min-w-0 items-center gap-[0.35em]">
                      <span className={cn("size-[0.4em] shrink-0 rounded-full", SERIES_BG[i])} />
                      <span className="truncate text-[0.65em] font-medium">{row.label}</span>
                    </span>
                    <span dir="ltr" className="text-[0.62em] tabular-nums text-text-secondary">{row.value}%</span>
                  </span>
                  <span className="h-[0.4em] overflow-hidden rounded-full bg-black/6">
                    <motion.span
                      className={cn("block h-full rounded-full", SERIES_BG[i])}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: counting ? row.value / 100 : 0 }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: FLOW_EASE }}
                      style={{ transformOrigin: "left" }}
                    />
                  </span>
                </span>
              ))}
            </div>
            <span className="px-[0.7em] pt-[0.5em] text-[0.6em] font-semibold uppercase tracking-[0.1em] text-text-secondary">
              {copy.templatesLabel}
            </span>
            <div className="flex min-h-0 flex-1 flex-col justify-start px-[0.7em] pb-[0.6em]">
              {copy.templates.map((tpl, i) => (
                <span key={tpl.name} className="flex items-center justify-between gap-[0.5em] border-b border-black/5 py-[0.32em] last:border-b-0">
                  <span className="flex min-w-0 items-center gap-[0.35em]">
                    <span className={cn("size-[0.35em] shrink-0 rounded-full", SERIES_BG[i])} />
                    <span className="truncate text-[0.62em]">{tpl.name}</span>
                  </span>
                  <span dir="ltr" className="shrink-0 text-[0.62em] font-semibold tabular-nums">{tpl.value}</span>
                </span>
              ))}
            </div>
          </Rise>
        </div>

        <Rise delay={0.75}>
          <p className="text-center text-[0.78em] font-medium tracking-tight text-text-primary">
            {copy.note}
          </p>
        </Rise>
      </div>
    </ScreenFrame>
  );
}
