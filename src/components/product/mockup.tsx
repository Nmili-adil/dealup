import { ImageIcon } from "lucide-react";
import manifest from "@/lib/mockups.generated.json";
import { cn } from "@/lib/utils/cn";

type Shot = {
  base: string;
  width: number;
  height: number;
  variants: number[];
};

/** Keys are whatever `npm run build:mockups` has produced so far. */
const mockups = manifest as Record<string, Shot | undefined>;

/**
 * A product screenshot from the generated WebP manifest.
 *
 * When the source PNG has not been added yet the manifest has no entry, so this
 * renders a labelled placeholder at the right aspect ratio rather than a broken
 * image. Drop `public/assets/<name>.png` in, add it to `SOURCES` in
 * `scripts/build-mockups.mjs`, run `npm run build:mockups`, and it appears.
 */
export function Mockup({
  name,
  alt,
  sizes,
  ratio = "16 / 10",
  className,
  priority = false,
}: {
  name: string;
  alt: string;
  sizes: string;
  /** Placeholder aspect ratio, used only until the asset exists. */
  ratio?: string;
  className?: string;
  priority?: boolean;
}) {
  const shot = mockups[name];

  if (!shot) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ aspectRatio: ratio }}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface-mint/60 p-6 text-center",
          className
        )}
      >
        <ImageIcon className="size-6 text-text-secondary" aria-hidden="true" />
        <span className="text-xs font-medium text-text-secondary">
          {`public/assets/${name}.png`}
        </span>
        <span className="max-w-xs text-[11px] leading-snug text-text-secondary">
          Add the file, then run <code className="font-mono">npm run build:mockups</code>
        </span>
      </div>
    );
  }

  const largest = shot.variants[shot.variants.length - 1];

  return (
    /* eslint-disable-next-line @next/next/no-img-element --
       next.config sets images.unoptimized for static export, so next/image
       emits no srcset. These pre-generated WebP variants are smaller. */
    <img
      src={`/assets/${shot.base}-${largest}.webp`}
      srcSet={shot.variants.map((w) => `/assets/${shot.base}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      width={shot.width}
      height={shot.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn("h-auto w-full", className)}
    />
  );
}
