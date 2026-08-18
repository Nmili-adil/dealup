import { cn } from "@/lib/utils/cn";

export function Eyebrow({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "ai" | "inverted";
}) {
  const toneClasses = {
    brand: "text-brand-hover bg-surface-mint",
    ai: "text-ai bg-ai/10",
    inverted: "text-white bg-white/10",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium tracking-wide",
        toneClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
