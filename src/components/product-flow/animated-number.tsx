"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Counts a value up on its own animation frames.
 *
 * State updates are throttled to roughly one per frame of visible change, and
 * the component owns only its own text node, so a running counter never
 * re-renders the scene around it.
 */
export function AnimatedNumber({
  value,
  locale,
  duration = 1100,
  decimals = 0,
  prefix = "",
  suffix = "",
  active,
}: {
  value: number;
  locale: string;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Counts only once its chapter is on screen. */
  active: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [shown, setShown] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    // The idle and reduced-motion figures are derived below rather than set
    // here, so the effect only ever owns the running count.
    if (!active || prefersReduced) return;

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Ease-out cubic: fast to begin with, settling on the final figure.
      setShown(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, value, duration, prefersReduced]);

  const current = !active ? 0 : prefersReduced ? value : shown;
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(current);

  // Latin numerals keep their own direction inside right-to-left copy.
  return (
    <span dir="ltr" className="inline-block tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
