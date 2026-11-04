import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function WorkflowNode({
  icon: Icon,
  label,
  tone = "neutral",
  className,
}: {
  icon?: LucideIcon;
  label: string;
  tone?: "neutral" | "brand" | "hot" | "cold";
  className?: string;
}) {
  const toneClasses = {
    neutral: "border-border/70 bg-white text-text-primary shadow-e1",
    brand: "border-brand/35 bg-white text-brand-dark shadow-brand",
    hot: "border-orange-200 bg-orange-50 text-orange-800 shadow-e1",
    cold: "border-sky-200 bg-sky-50 text-sky-800 shadow-e1",
  }[tone];

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium",
        toneClasses,
        className
      )}
    >
      {Icon ? <Icon className="size-4 shrink-0" aria-hidden="true" /> : null}
      <span className="text-balance">{label}</span>
    </div>
  );
}

export function WorkflowConnector({
  direction = "down",
  className,
}: {
  direction?: "down" | "split";
  className?: string;
}) {
  if (direction === "split") {
    return (
      <svg
        viewBox="0 0 120 40"
        preserveAspectRatio="none"
        className={cn("h-10 w-full text-brand/35", className)}
        aria-hidden="true"
      >
        <path
          d="M60 0 V12 M60 12 L20 12 L20 40 M60 12 L100 12 L100 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 2 32"
      preserveAspectRatio="none"
      className={cn("mx-auto h-8 w-0.5 text-brand/35", className)}
      aria-hidden="true"
    >
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
    </svg>
  );
}
