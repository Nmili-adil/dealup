import { cn } from "@/lib/utils/cn";

type SectionTone = "light" | "mint" | "forest" | "violet";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-background text-text-primary",
  mint: "bg-surface-mint text-text-primary",
  forest: "bg-brand-dark text-white",
  violet: "bg-ai-dark text-white",
};

export function Section({
  id,
  tone = "light",
  className,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 lg:py-28", toneClasses[tone], className)}>
      {children}
    </section>
  );
}
