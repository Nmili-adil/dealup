"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

const VIEW_W = 100;
const VIEW_H = 100;
/** Head-room so the peak never touches the top edge of the plot. */
const TOP_PAD = 6;

export type CampaignChartProps = {
  /** One value per day, ascending in time. */
  points: readonly number[];
  /** X-axis tick labels, same length as `points`. */
  days: readonly string[];
  /** Y-axis ticks, low → high. Rendered bottom → top. */
  ticks: readonly { value: number; label: string }[];
  /** Top of the Y scale. */
  max: number;
  /** Concise trend summary read in place of the graphic. */
  summary: string;
  className?: string;
};

/**
 * Illustrative campaign-delivery trend.
 *
 * The plot is drawn in a unit viewBox with `preserveAspectRatio="none"` so it
 * stretches to its container; the stroke uses `vectorEffect="non-scaling-stroke"`
 * to keep its weight constant, and the end marker is positioned in CSS percent
 * rather than as an SVG circle so it stays perfectly round under that stretch.
 */
export function CampaignChart({
  points,
  days,
  ticks,
  max,
  summary,
  className,
}: CampaignChartProps) {
  const gradientId = useId();
  const clipId = useId();
  const prefersReducedMotion = useReducedMotion();

  const coords = points.map((value, index) => {
    const x = (index / (points.length - 1)) * VIEW_W;
    const y = VIEW_H - TOP_PAD - (value / max) * (VIEW_H - TOP_PAD);
    return { x, y };
  });

  // Catmull-Rom → cubic Bézier, so the trend reads as a smooth curve without
  // overshooting the data the way a naive quadratic smoothing would.
  const line = coords
    .map((point, i) => {
      if (i === 0) return `M${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
      const p0 = coords[i - 2] ?? coords[i - 1];
      const p1 = coords[i - 1];
      const p2 = point;
      const p3 = coords[i + 1] ?? point;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      return `C${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    })
    .join(" ");

  const area = `${line} L${VIEW_W} ${VIEW_H} L0 ${VIEW_H} Z`;
  const last = coords[coords.length - 1];

  const grow = prefersReducedMotion
    ? {
        initial: { width: VIEW_W },
        whileInView: { width: VIEW_W },
        transition: { duration: 0 },
      }
    : {
        initial: { width: 0 },
        whileInView: { width: VIEW_W },
        transition: { duration: 1.5, ease: [0.33, 1, 0.68, 1] as const },
      };

  return (
    <figure className={cn("m-0 flex flex-col gap-2", className)}>
      <div className="flex gap-3">
        {/* Y axis */}
        <div className="flex w-7 shrink-0 flex-col justify-between py-px text-end text-[10px] tabular-nums text-text-secondary">
          {[...ticks].reverse().map((tick) => (
            <span key={tick.label}>{tick.label}</span>
          ))}
        </div>

        <div className="relative h-32 flex-1">
          {/* Gridlines sit behind the data and stay low-contrast. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col justify-between"
          >
            {ticks.map((tick) => (
              <span key={tick.label} className="h-px w-full bg-border/60" />
            ))}
          </div>

          {/* In RTL the date axis runs right-to-left, so the plot is mirrored
              to match — otherwise the curve would peak on the opposite side
              from the latest date it is supposed to represent. The end marker
              lives inside this wrapper so it mirrors along with the line, and
              being a circle it is unaffected by the flip. */}
          <div className="absolute inset-0 rtl:-scale-x-100">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              role="img"
              aria-label={summary}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  {/* 20% fill keeps the area readable without burying the line. */}
                  <stop
                    offset="0%"
                    stopColor="var(--brand)"
                    stopOpacity="0.28"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--brand)"
                    stopOpacity="0"
                  />
                </linearGradient>

                {/* One wipe drives both fill and stroke, so they grow in step. */}
                <clipPath id={clipId}>
                  <motion.rect
                    x="0"
                    y="0"
                    height={VIEW_H}
                    viewport={{ once: true, margin: "-60px" }}
                    {...grow}
                  />
                </clipPath>
              </defs>

              <g clipPath={`url(#${clipId})`}>
                <path d={area} fill={`url(#${gradientId})`} />
                <path
                  d={line}
                  fill="none"
                  stroke="var(--brand-hover)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            </svg>

            {/* Positioned in percent so it stays circular despite the stretch. */}
            <motion.span
              aria-hidden="true"
              className="absolute size-2.5 rounded-full border-2 border-white bg-brand-hover shadow-e1"
              style={{
                left: `${(last.x / VIEW_W) * 100}%`,
                top: `${(last.y / VIEW_H) * 100}%`,
                translate: "-50% -50%",
              }}
              initial={{
                opacity: prefersReducedMotion ? 1 : 0,
                scale: prefersReducedMotion ? 1 : 0.4,
              }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.35,
                delay: prefersReducedMotion ? 0 : 1.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
      </div>

      {/* X axis, aligned to the plot area rather than the whole figure. */}
      <div className="flex gap-3">
        <span aria-hidden="true" className="w-7 shrink-0" />
        <div className="flex flex-1 justify-between text-[10px] tabular-nums text-text-secondary">
          {days.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </figure>
  );
}
