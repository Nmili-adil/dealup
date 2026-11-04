"use client";

import { useCallback } from "react";
import { CalendarDays, TrendingUp } from "lucide-react";
import { DemoStage, type DemoScript } from "./demo-stage";
import { DemoCursor } from "./demo-cursor";
import { cn } from "@/lib/utils/cn";

/** Values revealed as the cursor sweeps the chart. */
const readings = ["18%", "34%", "51%"];
/** Cursor stops, matching the plotted points below. */
const stops = [
  { x: 30, y: 74 },
  { x: 55, y: 64 },
  { x: 80, y: 50 },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const series = [22, 30, 26, 38, 34, 44, 58];
const MAX = 70;

export function DemoAnalytics({ label, playing }: { label: string; playing: boolean }) {
  const script: DemoScript = useCallback(async ({ moveTo, setStep, wait, isLive }) => {
    for (let i = 0; i < stops.length; i++) {
      await moveTo(stops[i].x, stops[i].y, i === 0 ? 0.85 : 0.7);
      if (!isLive()) return;
      setStep(i + 1);
      await wait(i === stops.length - 1 ? 1.4 : 0.7);
      if (!isLive()) return;
    }
  }, []);

  // Plot in a 100x100 viewBox so the polyline scales with the stage.
  const points = series
    .map((v, i) => `${(i / (series.length - 1)) * 100},${100 - (v / MAX) * 100}`)
    .join(" ");

  return (
    <DemoStage label={label} script={script} restStep={3} playing={playing}>
      {(step) => (
        <div className="flex h-full flex-col gap-2 p-2.5 text-[8px] leading-tight">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-text-primary">Campaign performance</span>
            <span className="flex items-center gap-1 rounded-md border border-border/70 px-1.5 py-0.5 text-text-secondary">
              <CalendarDays className="size-2" />
              Last 7 days
            </span>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Delivered", value: "8 210", trend: "+14%" },
              { label: "Read", value: "91%", trend: "+6%" },
              { label: "Replies", value: readings[Math.max(0, step - 1)], trend: "+9%" },
            ].map((s, i) => (
              <span
                key={s.label}
                className={cn(
                  "flex flex-col gap-0.5 rounded-md border px-1.5 py-1 transition-colors duration-300",
                  i === 2 && step > 0
                    ? "border-brand/40 bg-surface-mint"
                    : "border-border/70 bg-white"
                )}
              >
                <span className="text-text-secondary">{s.label}</span>
                <span className="flex items-baseline gap-1">
                  <span dir="ltr" className="inline-block font-semibold tabular-nums text-text-primary">
                    {s.value}
                  </span>
                  <span dir="ltr" className="inline-block tabular-nums text-brand-hover">
                    {s.trend}
                  </span>
                </span>
              </span>
            ))}
          </div>

          {/* Plot */}
          <div className="relative flex-1">
            {/* Gridlines stay low-contrast so they never compete with the data. */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-px w-full bg-border/60" />
              ))}
            </div>

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full text-brand"
            >
              <polyline
                points={points}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Dot + tooltip ride the cursor's three stops. */}
            {step > 0 ? (
              <>
                <span
                  className="absolute z-10 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-brand-hover transition-all duration-300"
                  style={{ left: `${stops[step - 1].x}%`, top: `${stops[step - 1].y}%` }}
                />
                <span
                  className="absolute z-20 -translate-x-1/2 -translate-y-[160%] rounded bg-brand-dark px-1 py-0.5 font-medium text-white transition-all duration-300"
                  style={{ left: `${stops[step - 1].x}%`, top: `${stops[step - 1].y}%` }}
                >
                  {readings[step - 1]}
                </span>
              </>
            ) : null}

            <TrendingUp className="absolute end-0 top-0 size-2.5 text-brand-hover" />
          </div>

          {/* X axis */}
          <div className="flex justify-between text-text-secondary">
            {days.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <DemoCursor />
        </div>
      )}
    </DemoStage>
  );
}
