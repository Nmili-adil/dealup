import { cn } from "@/lib/utils/cn";
import { GradientText } from "@/components/ui/titleCustomize";
import { SectionEyebrow } from "./section-eyebrow";

export function SectionHeader({
  eyebrow,
  headline,
  highlight,
  description,
  align = "start",
  tone = "brand",
  className,
}: {
  eyebrow?: string;
  headline: string;
  /** Trailing phrase rendered in the brand gradient, as the hero does. */
  highlight?: string;
  description?: string;
  align?: "start" | "center";
  tone?: "brand" | "ai" | "inverted";
  className?: string;
}) {
  const isInverted = tone === "inverted" || tone === "ai";

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <SectionEyebrow tone={tone} align={align}>
          {eyebrow}
        </SectionEyebrow>
      ) : null}

      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[44px] lg:leading-[1.1]",
          isInverted ? "text-white" : "text-text-primary"
        )}
      >
        {headline}
        {highlight ? <GradientText variant="brand">{highlight}</GradientText> : null}
      </h2>

      {description ? (
        <p
          className={cn(
            // Cap the measure so descriptions stay in the 60-75 char band.
            "max-w-2xl text-lg leading-relaxed",
            isInverted ? "text-white/70" : "text-text-secondary"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
