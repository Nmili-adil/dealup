import { cn } from "@/lib/utils/cn";
import { Eyebrow } from "./eyebrow";

export function SectionHeader({
  eyebrow,
  headline,
  description,
  align = "start",
  tone = "brand",
  className,
}: {
  eyebrow?: string;
  headline: string;
  description?: string;
  align?: "start" | "center";
  tone?: "brand" | "ai" | "inverted";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
        {headline}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-lg leading-relaxed",
            tone === "inverted" ? "text-white/70" : "text-text-secondary"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
