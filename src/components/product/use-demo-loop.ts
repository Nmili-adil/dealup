"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

/** No-op subscription: the mounted flag never changes after the first render. */
const subscribeNever = () => () => {};

/**
 * Drives a looping, staged product demo.
 *
 * The pattern the phone mockups share: hold each stage for its own duration,
 * wrap back to the first, run only while the unit is on screen, and collapse to
 * a single finished frame under `prefers-reduced-motion`.
 *
 * `staticMode` is gated on mount so the server and the first client render
 * produce identical markup — `useReducedMotion` is null until mounted, and
 * branching the initial markup on it would fail hydration. State only ever
 * changes from a timer callback, never synchronously in the effect body, so the
 * sequence cannot cascade renders.
 *
 * Callers read `stage` for what to show and spread `ref` onto the element to
 * observe. In `staticMode` the stage sits at the last index, which is why the
 * final beat of a sequence should be its settled state.
 */
export function useDemoLoop(
  durations: readonly number[],
  { threshold = 0.3, startDelay = 150 }: { threshold?: number; startDelay?: number } = {}
) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [stage, setStage] = useState(0);

  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);
  const staticMode = mounted && Boolean(prefersReducedMotion);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (staticMode || !onScreen) return;

    let cancelled = false;
    let timer: number | undefined;

    const step = (index: number) => {
      if (cancelled) return;
      setStage(index);
      timer = window.setTimeout(() => {
        if (cancelled) return;
        step(index + 1 >= durations.length ? 0 : index + 1);
      }, durations[index]);
    };

    // Scheduled rather than called straight from the effect body, so the unit
    // has a moment to settle before the first beat.
    timer = window.setTimeout(() => {
      if (cancelled) return;
      step(0);
    }, startDelay);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
    // `durations` is a module-level constant at every call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen, staticMode, startDelay, durations.length]);

  return {
    ref,
    staticMode,
    /** Under reduced motion the sequence rests on its final, settled beat. */
    stage: staticMode ? durations.length - 1 : stage,
  };
}
