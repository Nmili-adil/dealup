import type { LucideIcon } from "lucide-react";

/**
 * A dense figure for the floating panels beside the hero phone mockups.
 *
 * `MetricCard` is the roomier form — one figure per row at `text-xl`. This is
 * the compact one: four fit in a 280px panel, which is what lets a panel carry
 * a whole funnel rather than a single headline number.
 *
 * `rate` is optional so a caller can withhold it while a count-up is still
 * running — a settled percentage beside a moving value is arithmetic that does
 * not add up on screen.
 */
export function PanelStat({
  icon: Icon,
  label,
  value,
  rate,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  rate?: string;
}) {
  return (
    <div className="rounded-lg border border-border/70 bg-white px-2.5 py-2">
      <span className="flex items-center gap-1.5 text-[10px] font-medium leading-4 text-text-secondary">
        <Icon className="size-3 shrink-0 text-brand-hover" aria-hidden="true" />
        <span className="truncate">{label}</span>
      </span>
      <span className="mt-0.5 flex items-baseline gap-1">
        <span className="text-[15px] font-semibold leading-5 tabular-nums text-text-primary">
          {value}
        </span>
        {rate ? (
          <span className="text-[10px] font-semibold tabular-nums text-brand-hover">
            {rate}
          </span>
        ) : null}
      </span>
    </div>
  );
}
