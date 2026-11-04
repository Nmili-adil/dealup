import type { LucideIcon } from "lucide-react";
import { IconTile } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

/**
 * Two-column feature list used by the alternating story sections.
 * Keeps icon treatment and text hierarchy identical across light and dark tones.
 */
export function FeatureList({
  items,
  icons,
  tone = "brand",
  className,
}: {
  items: readonly { title: string; description: string }[];
  icons: readonly LucideIcon[];
  tone?: "brand" | "ai" | "inverted";
  className?: string;
}) {
  const isDark = tone === "ai" || tone === "inverted";

  return (
    <ul className={cn("grid gap-6 sm:grid-cols-2", className)}>
      {items.map((item, index) => {
        const Icon = icons[index];
        return (
          <li key={item.title} className="flex flex-col gap-3">
            <IconTile tone={tone === "brand" ? "brand" : tone === "ai" ? "ai" : "inverted"} size="sm">
              {Icon ? <Icon aria-hidden="true" /> : null}
            </IconTile>
            <span
              className={cn(
                "font-semibold",
                isDark ? "text-white" : "text-text-primary"
              )}
            >
              {item.title}
            </span>
            <span
              className={cn(
                "text-sm leading-relaxed",
                // /70 keeps secondary text above the 4.5:1 floor on the
                // forest and violet backgrounds; /60 did not.
                isDark ? "text-white/70" : "text-text-secondary"
              )}
            >
              {item.description}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
