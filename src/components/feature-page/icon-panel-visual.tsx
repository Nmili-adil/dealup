import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Fallback hero visual for pages that have no dedicated product screenshot
 * (e.g. a physical accessory, or a directory/index page). Renders an honest
 * icon panel with plain capability labels instead of a fabricated mockup —
 * the same "labels, not fake numbers" idiom used by the homepage's early
 * access band.
 */
export function IconPanelVisual({
  icon: Icon,
  label,
  points,
  className,
}: {
  icon: LucideIcon;
  label: string;
  points: string[];
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[560px] lg:max-w-none", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-brand/10 blur-3xl"
      />
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white to-surface-mint p-8 shadow-e4 ring-1 ring-brand-dark/10 sm:p-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-faint opacity-60 mask-fade-edges"
        />
        <div className="relative flex flex-col items-center gap-6 text-center">
          <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-brand-dark/8 text-brand-dark ring-1 ring-brand-dark/10">
            <Icon className="size-8" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <p className="text-lg font-semibold text-text-primary">{label}</p>
          <ul className="grid w-full gap-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2.5 rounded-xl bg-white/70 px-4 py-3 text-start text-sm text-text-on-sand ring-1 ring-border/60"
              >
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
