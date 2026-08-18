import type { LucideIcon } from "lucide-react";
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
    <div className={cn("rounded-xl border border-border bg-white p-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-muted">{label}</span>
        {Icon ? <Icon className="size-4 text-text-muted" aria-hidden="true" /> : null}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-text-primary">{value}</span>
        {trend ? <span className="text-xs font-medium text-brand-hover">{trend}</span> : null}
      </div>
    </div>
  );
}
