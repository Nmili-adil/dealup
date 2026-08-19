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
    <div className="w-full flex items-center justify-center relative">
      <div className=" w-full h-px shadow rounded-md bg-brand-dark absolute z-10 "/>
      <span
        className={cn(
          "inline-flex items-center rounded-full text-lg underline underline-offset-8  z-20 px-3 py-1 font-medium tracking-wide",
          toneClasses,
          className,
        )}
      >
        {children}
      </span>
    </div>
  );
}
