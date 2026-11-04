"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

/** Handed to each demo's script so it can drive the cursor and the mini-UI. */
export type DemoControls = {
  /** Move the cursor to a point on the stage, in percent. */
  moveTo: (xPercent: number, yPercent: number, seconds?: number) => Promise<void>;
  /** Play the click ripple at the cursor's current position. */
  click: () => Promise<void>;
  /** Advance the mini-UI to a numbered step. */
  setStep: (step: number) => void;
  /** Await, but resolve early if the sequence was cancelled. */
  wait: (seconds: number) => Promise<void>;
  /** False once the stage unmounts or leaves the viewport — check between beats. */
  isLive: () => boolean;
};

export type DemoScript = (controls: DemoControls) => Promise<void>;

/** No-op subscription: the mounted flag never changes after the first render. */
const subscribeNever = () => () => {};

/**
 * Shared runner for the looping product demos.
 *
 * The loop only runs while the stage is on screen and the section is playing,
 * and is disabled outright under `prefers-reduced-motion` — where `restStep`
 * is rendered instead, so the card still shows a meaningful final state.
 *
 * The stage is decorative next to the card's own heading and copy, so it is
 * exposed as a single labelled image and its internals are hidden from
 * assistive tech. Nothing inside is focusable.
 */
export function DemoStage({
  label,
  script,
  restStep,
  playing = true,
  children,
  className,
}: {
  label: string;
  script: DemoScript;
  /** Step shown when motion is off — the state the script ends on. */
  restStep: number;
  playing?: boolean;
  children: (step: number) => ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [scope, animate] = useAnimate();
  const [onScreen, setOnScreen] = useState(false);
  const [step, setStep] = useState(0);

  // Read inside the async script without restarting it on every change.
  const liveRef = useRef(false);
  // `useAnimate` returns a fresh `animate` each render, and `setStep` renders
  // on every beat. Holding both in refs keeps the effect's deps stable, so the
  // sequence runs to completion instead of cancel-restarting after step one.
  const animateRef = useRef(animate);
  const scriptRef = useRef(script);

  // Runs after every render, and before the loop effect below on mount, so the
  // sequence always calls the current handles without listing them as deps.
  useEffect(() => {
    animateRef.current = animate;
    scriptRef.current = script;
  });

  // `useReducedMotion` reads the media query during the first client render,
  // which the server cannot know — swapping the step straight away would make
  // the rendered text differ and fail hydration. Gate on mount instead:
  // `getServerSnapshot` returns false, so both passes agree, and the rest state
  // is applied on the next render. No setState-in-effect needed.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );
  const staticMode = mounted && Boolean(prefersReducedMotion);

  const active = playing && onScreen && !prefersReducedMotion;
  // With motion off the card still shows something meaningful: the state the
  // script ends on.
  const displayStep = staticMode ? restStep : step;

  useEffect(() => {
    const node = scope.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [scope]);

  useEffect(() => {
    if (prefersReducedMotion || !active) {
      liveRef.current = false;
      return;
    }

    liveRef.current = true;

    const cursor = () => scope.current?.querySelector("[data-demo-cursor]");
    const ripple = () => scope.current?.querySelector("[data-demo-ripple]");

    const controls: DemoControls = {
      isLive: () => liveRef.current,
      wait: (seconds) =>
        new Promise((resolve) => {
          const id = window.setTimeout(resolve, seconds * 1000);
          // Resolve immediately if the loop is torn down mid-wait.
          if (!liveRef.current) {
            window.clearTimeout(id);
            resolve();
          }
        }),
      moveTo: async (xPercent, yPercent, seconds = 0.9) => {
        const el = cursor();
        const stage = scope.current;
        if (!el || !stage) return;
        // Convert percent to pixels once per beat and animate transforms, so
        // the movement stays on the compositor instead of laying out each
        // frame. Re-measured per beat, which keeps it correct across resizes.
        const { width, height } = stage.getBoundingClientRect();
        await animateRef.current(
          el,
          { x: (xPercent / 100) * width, y: (yPercent / 100) * height },
          { duration: seconds, ease: [0.4, 0, 0.2, 1] }
        );
      },
      click: async () => {
        const el = ripple();
        if (!el) return;
        await animateRef.current(
          el,
          { scale: [0, 1.15], opacity: [0.65, 0] },
          { duration: 0.42, ease: "easeOut" }
        );
      },
      setStep: (next) => setStep(next),
    };

    let cancelled = false;

    const loop = async () => {
      // Restart from the top each time the stage comes back into view.
      while (!cancelled && liveRef.current) {
        setStep(0);
        await scriptRef.current(controls);
        if (cancelled || !liveRef.current) break;
        await controls.wait(1.1);
      }
    };

    void loop();

    return () => {
      cancelled = true;
      liveRef.current = false;
    };
  }, [active, prefersReducedMotion, restStep, scope]);

  return (
    <div
      ref={scope}
      role="img"
      aria-label={label}
      // Exposes the current beat so tests can assert the sequence advances.
      data-demo-step={displayStep}
      data-demo-static={staticMode ? "true" : undefined}
      className={cn(
        "relative isolate h-60 w-full overflow-hidden rounded-2xl border border-border/70 bg-white sm:h-64",
        // Nothing moves in static mode, so a parked cursor is just clutter.
        "data-[demo-static=true]:[&_[data-demo-cursor]]:hidden",
        className
      )}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {children(displayStep)}
      </div>
    </div>
  );
}
