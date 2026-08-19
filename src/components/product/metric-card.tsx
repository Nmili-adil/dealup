import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
  className,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-xl border border-border/70 bg-white p-3.5",
        className
      )}
    >
      <span className="text-[11px] font-medium text-text-secondary">{label}</span>

      {/* Tabular figures stop the row jittering as values change. */}
      <span className="text-xl font-semibold tabular-nums text-text-primary">
        {value}
      </span>

      {/* Trend and icon share the closing row, as in the reference layout. */}
      <div className="flex min-h-7 items-center justify-between gap-2">
        {trend ? (
          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold tabular-nums text-brand-hover">
            <ArrowUpRight className="size-3" aria-hidden="true" />
            {trend}
          </span>
        ) : (
          <span aria-hidden="true" />
        )}

        {Icon ? (
          <span
            aria-hidden="true"
            className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface-mint text-brand-hover"
          >
            <Icon className="size-3.5" />
          </span>
        ) : null}
      </div>
    </div>
  );
}
