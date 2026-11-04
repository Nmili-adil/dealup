import { cn } from "@/lib/utils/cn";

/**
 * Decorative trend shape for a metric tile.
 *
 * Purely illustrative: the numeric value beside it carries the meaning, so this
 * is hidden from assistive tech rather than given a misleading label.
 */
export function Sparkline({
  points,
  className,
  tone = "brand",
}: {
  points: readonly number[];
  className?: string;
  tone?: "brand" | "ai";
}) {
  const width = 100;
  const height = 32;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;

  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;
    // Inset by 3px top and bottom so the stroke never clips at the edges.
    const y = height - 3 - ((point - min) / span) * (height - 6);
    return [x, y] as const;
  });

  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const gradientId = `spark-${tone}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("h-8 w-full", tone === "ai" ? "text-ai" : "text-brand", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
