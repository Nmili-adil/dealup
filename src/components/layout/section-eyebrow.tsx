import { cn } from "@/lib/utils/cn";

/**
 * Eyebrow used by section headers.
 *
 * Kept separate from `Eyebrow` (the hero's banner-style label) so the hero
 * keeps its own treatment while sections share this quieter, denser one:
 * a small tracked label riding a hairline rule that extends into free space.
 */
export function SectionEyebrow({
  children,
  className,
  tone = "brand",
  align = "start",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "ai" | "inverted";
  align?: "start" | "center";
}) {
  const { label, dot, rule } = {
    brand: { label: "text-brand-hover", dot: "bg-brand", rule: "bg-brand-dark/15" },
    ai: { label: "text-ai-on-dark", dot: "bg-ai-on-dark", rule: "bg-white/15" },
    inverted: { label: "text-white/75", dot: "bg-brand", rule: "bg-white/15" },
  }[tone];

  return (
    <div className="flex w-full items-center gap-4">
      {align === "center" ? <span className={cn("h-px flex-1", rule)} /> : null}

      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]",
          label,
          className
        )}
      >
        <span className={cn("size-1.5 rounded-full", dot)} aria-hidden="true" />
        {children}
      </span>

      <span className={cn("h-px flex-1", rule)} />
    </div>
  );
}
