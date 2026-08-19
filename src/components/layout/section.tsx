import { cn } from "@/lib/utils/cn";

type SectionTone = "light" | "mint" | "forest" | "violet" | "white";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-background text-text-primary",
  white: "bg-white text-text-primary",
  mint: "bg-surface-mint text-text-primary",
  forest: "bg-brand-dark text-white",
  violet: "bg-ai-dark text-white",
};

const spacingClasses = {
  sm: "py-14 lg:py-20",
  md: "py-20 lg:py-28",
  lg: "py-24 lg:py-36",
} as const;

export function Section({
  id,
  tone = "light",
  spacing = "md",
  decoration = "none",
  className,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  /** Vertical rhythm. Use `lg` sparingly to mark a page beat. */
  spacing?: keyof typeof spacingClasses;
  /** Subtle background texture. Purely decorative and non-interactive. */
  decoration?: "none" | "grid" | "glow";
  className?: string;
  children: React.ReactNode;
}) {
  const isDark = tone === "forest" || tone === "violet";

  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden",
        spacingClasses[spacing],
        toneClasses[tone],
        className
      )}
    >
      {decoration === "grid" ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 mask-fade-edges",
            isDark ? "bg-grid-inverted" : "bg-grid-faint"
          )}
        />
      ) : null}

      {decoration === "glow" ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[900px] max-w-[140vw] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl",
            isDark ? "bg-brand/12" : "bg-brand/8"
          )}
        />
      ) : null}

      {children}
    </section>
  );
}
