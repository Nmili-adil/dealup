import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Motion's named easings, as their CSS timing-function equivalents. */
const NAMED_EASE = {
  linear: "linear",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
} as const;

type Ease = keyof typeof NAMED_EASE | readonly [number, number, number, number];

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
  "--reveal-duration": string;
  "--reveal-x": string;
  "--reveal-y": string;
  "--reveal-scale": number;
  "--reveal-ease": string;
};

export function MotionReveal({
  children,
  delay = 0,
  duration = 0.5,
  y = 16,
  x = 0,
  scale = 1,
  ease = [0.22, 1, 0.36, 1],
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  ease?: Ease;
  className?: string;
}) {
  const style: RevealStyle = {
    "--reveal-delay": `${delay}s`,
    "--reveal-duration": `${duration}s`,
    "--reveal-x": `${x}px`,
    "--reveal-y": `${y}px`,
    "--reveal-scale": scale,
    "--reveal-ease":
      typeof ease === "string" ? NAMED_EASE[ease] : `cubic-bezier(${ease.join(",")})`,
  };

  return (
    <div className={cn("motion-reveal", className)} style={style}>
      {children}
    </div>
  );
}
