"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useMotionValue, useReducedMotion, type MotionValue } from "motion/react";
import { FLOW_STAGES, TOTAL_STAGES, type StageId } from "./flow-stages";

/** No-op subscription: the mounted flag never changes after the first render. */
const subscribeNever = () => () => {};

/** Beats a chapter is divided into. Scenes key their steps off this. */
export const BEATS = 20;

export interface FlowTimeline {
  index: number;
  stageId: StageId;
  /** Coarse position inside the current chapter, 0…BEATS-1. */
  beat: number;
  /** Smooth 0…1 position, for the navigation bar only — never React state. */
  progress: MotionValue<number>;
  isPlaying: boolean;
  /** True once mounted; keeps the first client render identical to the server. */
  ready: boolean;
  reduced: boolean;
  select: (index: number) => void;
  toggle: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Drives the chapter sequence.
 *
 * Time is accumulated per animation frame rather than derived from a start
 * timestamp, so pausing mid-chapter and resuming continues from exactly where
 * it stopped instead of restarting the chapter.
 *
 * Autoplay runs only while the section is on screen and the user has not
 * paused it, and never under `prefers-reduced-motion`.
 */
export function useFlowTimeline(): FlowTimeline {
  const [index, setIndex] = useState(0);
  const [beat, setBeat] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  const progress = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef(0);
  const frameRef = useRef(0);

  // Mount gate as a subscription, so the server and the first client render
  // agree; `useReducedMotion` is null until mounted and branching the initial
  // markup on it would fail hydration.
  const ready = useSyncExternalStore(subscribeNever, () => true, () => false);
  const prefersReduced = useReducedMotion();
  const reduced = ready && Boolean(prefersReduced);

  const running = ready && onScreen && !userPaused && !reduced;

  // Pause when the section scrolls out of view.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const resetChapter = useCallback(() => {
    elapsedRef.current = 0;
    progress.set(0);
    setBeat(0);
  }, [progress]);

  const select = useCallback(
    (next: number) => {
      setIndex(((next % TOTAL_STAGES) + TOTAL_STAGES) % TOTAL_STAGES);
      resetChapter();
    },
    [resetChapter]
  );

  const toggle = useCallback(() => setUserPaused((paused) => !paused), []);

  useEffect(() => {
    if (!running) return;

    lastTickRef.current = performance.now();
    const duration = FLOW_STAGES[index].duration;

    const tick = (now: number) => {
      elapsedRef.current += now - lastTickRef.current;
      lastTickRef.current = now;

      const ratio = Math.min(elapsedRef.current / duration, 1);
      progress.set(ratio);

      const nextBeat = Math.min(Math.floor(ratio * BEATS), BEATS - 1);
      setBeat((current) => (current === nextBeat ? current : nextBeat));

      if (ratio >= 1) {
        elapsedRef.current = 0;
        progress.set(0);
        setBeat(0);
        setIndex((current) => (current + 1) % TOTAL_STAGES);
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running, index, progress]);

  // Without motion there is no playhead, so show each chapter fully formed.
  useEffect(() => {
    if (reduced) progress.set(1);
  }, [reduced, index, progress]);

  return {
    index,
    stageId: FLOW_STAGES[index].id,
    beat: reduced ? BEATS - 1 : beat,
    progress,
    isPlaying: running,
    ready,
    reduced,
    select,
    toggle,
    containerRef,
  };
}
