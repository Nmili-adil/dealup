import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import sizes from "@/../public/assets/logos/logo.generated.json";

/**
 * Dealup logo.
 *
 * The brand file is a *stacked* lockup on an opaque white field. At navbar
 * height that stack renders the wordmark as an illegible smudge, so
 * `npm run build:logo` splits it into a transparent mark and wordmark; this
 * component sets them side by side as a horizontal lockup.
 *
 * Intrinsic dimensions come from the generated manifest, so re-running the
 * script after a brand update keeps the aspect ratios exact and avoids
 * layout shift.
 */
export function Logo({
  className,
  markHeight = 32,
  wordHeight = 20,
  priority = false,
}: {
  className?: string;
  markHeight?: number;
  wordHeight?: number;
  priority?: boolean;
}) {
  const mark = sizes["dealup-mark"];
  const word = sizes["dealup-wordmark"];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/assets/logos/dealup-mark.webp"
        alt=""
        aria-hidden="true"
        width={mark.width}
        height={mark.height}
        priority={priority}
        style={{ height: markHeight, width: "auto" }}
        className="shrink-0"
      />
      <Image
        src="/assets/logos/dealup-wordmark.webp"
        alt=""
        aria-hidden="true"
        width={word.width}
        height={word.height}
        priority={priority}
        style={{ height: wordHeight, width: "auto" }}
        className="shrink-0"
      />
    </span>
  );
}
