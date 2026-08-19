"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Dwell time per step before auto-advancing. */
const AUTOPLAY_MS = 6000;

export type ShowcaseStep = {
  number: string;
  title: string;
  description: string;
  caption: string;
  alt: string;
  highlights: readonly { title: string; description: string }[];
};

export type ShowcaseShot = {
  base: string;
  width: number;
  height: number;
  variants: readonly number[];
};
export function PlatformShowcase({
  steps,
  shots,
  captionLabel,
  pauseLabel,
  playLabel,
}: {
  steps: readonly ShowcaseStep[];
  shots: readonly ShowcaseShot[];
  captionLabel: string;
  pauseLabel: string;
  playLabel: string;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // Autoplay is opt-out (a play/pause control), but suspends on its own
  // whenever the reader is interacting or can't see the section.
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;

  // Reduced motion disables auto-advance outright — it is unrequested motion,
  // not decoration that can simply be shortened.
  const autoplaying = !paused && !interacting && onScreen && !prefersReducedMotion;

  // Only run the timer while the section is actually on screen, so a page
  // scrolled past this section isn't churning through images in the background.
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplaying) return;
    const id = window.setInterval(
      () => setActive((current) => (current + 1) % steps.length),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(id);
  }, [autoplaying, steps.length]);

  /** Any deliberate tab choice stops the carousel for good. */
  const selectTab = useCallback((index: number) => {
    setActive(index);
    setPaused(true);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const last = steps.length - 1;
      let next: number | null = null;

      if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
      else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = last;

      if (next === null) return;
      event.preventDefault();
      selectTab(next);
      tabRefs.current[next]?.focus();
    },
    [active, steps.length, selectTab]
  );

  const step = steps[active];
  const shot = shots[active];

  return (
    <div
      ref={rootRef}
      // Hover and keyboard focus suspend rotation without consuming the
      // reader's explicit pause choice (WCAG 2.2.2 — stop on focus/hover).
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setInteracting(false);
        }
      }}
      className="flex flex-col gap-8"
    >
      {/* --- Step tabs --- */}
      <div
        role="tablist"
        aria-label={captionLabel}
        onKeyDown={onKeyDown}
        className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
      >
        {steps.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.number}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={tabId(index)}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={panelId(index)}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(index)}
              className={cn(
                "group relative flex min-w-47.5 shrink-0 snap-start cursor-pointer flex-col gap-1.5 rounded-2xl border p-4 text-start transition-all duration-300 lg:min-w-0",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover",
                selected
                  ? "border-brand/35 bg-white shadow-e2"
                  : "border-border/70 bg-white/50 hover:border-brand/25 hover:bg-white"
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold tabular-nums transition-colors duration-300",
                    selected
                      ? "bg-brand-dark text-white"
                      : "bg-surface-mint text-text-secondary group-hover:text-brand-hover"
                  )}
                >
                  {item.number}
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold transition-colors duration-300",
                    selected ? "text-text-primary" : "text-text-secondary"
                  )}
                >
                  {item.title}
                </span>
              </span>

              {/* Selection is carried by weight, fill and this bar — not
                  colour alone. While rotating, it doubles as a progress track
                  so the next advance is never a surprise. */}
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1 h-0.5 overflow-hidden rounded-full transition-all duration-300",
                  selected ? "w-8 bg-brand/25" : "w-4 bg-border"
                )}
              >
                {selected ? (
                  <motion.span
                    key={`progress-${active}-${autoplaying}`}
                    className="block h-full rounded-full bg-brand"
                    initial={{ width: autoplaying ? "0%" : "100%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: autoplaying ? AUTOPLAY_MS / 1000 : 0,
                      ease: "linear",
                    }}
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {/* --- Active panel --- */}
      <div
        key={panelId(active)}
        id={panelId(active)}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-hover"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
          {/* Stage */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 inset-y-10 -z-10 rounded-full bg-brand/12 blur-3xl"
            />

            <AnimatePresence mode="wait">
              <motion.figure
                key={shot.base + active}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14, scale: prefersReducedMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="m-0 flex flex-col items-center gap-4"
              >
                {/* Fixed stage height keeps portrait and landscape shots from
                    resizing the section as the reader switches tabs.
                    The renders are transparent PNGs with their own device frame
                    and drop shadow, so they sit straight on the background —
                    no border or panel, which would outline empty pixels. */}
                <div className="flex h-72 w-full items-center justify-center sm:h-96 lg:h-140">
                  {/* eslint-disable-next-line @next/next/no-img-element --
                      next.config sets images.unoptimized for static export, so
                      next/image emits no srcset. These pre-generated WebP
                      variants are smaller than what next/image would ship. */}
                  <img
                    src={`/assets/${shot.base}-${shot.variants[shot.variants.length - 1]}.webp`}
                    srcSet={shot.variants
                      .map((w) => `/assets/${shot.base}-${w}.webp ${w}w`)
                      .join(", ")}
                    sizes="(min-width: 1024px) 60vw, 92vw"
                    width={shot.width}
                    height={shot.height}
                    alt={step.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>

                <figcaption className="flex max-w-full items-center gap-2 rounded-2xl border border-border/70 bg-white/80 px-4 py-1.5 text-center text-xs font-medium text-balance text-text-secondary backdrop-blur-sm sm:rounded-full">
                  <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  <span className="sr-only">{captionLabel}: </span>
                  {step.caption}
                </figcaption>

                {/* Rotation is only announced once, on the control itself —
                    the panel is not a live region, so switching tabs never
                    interrupts a screen reader mid-sentence. */}
                {prefersReducedMotion ? null : (
                  <button
                    type="button"
                    onClick={() => setPaused((value) => !value)}
                    aria-pressed={paused}
                    aria-label={paused ? playLabel : pauseLabel}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border/70 bg-white/80 px-3 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-sm transition-colors hover:border-brand/40 hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
                  >
                    {paused ? (
                      <Play className="size-3.5" aria-hidden="true" />
                    ) : (
                      <Pause className="size-3.5" aria-hidden="true" />
                    )}
                    {paused ? playLabel : pauseLabel}
                  </button>
                )}
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Explanation cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${active}`}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.35,
                delay: prefersReducedMotion ? 0 : 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold tracking-tight text-text-primary">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-text-secondary">{step.description}</p>
              </div>

              <ul className="flex flex-col gap-3">
                {step.highlights.map((highlight) => (
                  <li
                    key={highlight.title}
                    className="flex gap-3 rounded-2xl border border-border/70 bg-white p-4 shadow-e1 transition-[box-shadow,border-color] duration-300 hover:border-brand/30 hover:shadow-e2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/15"
                    >
                      <Check className="size-3 text-brand-hover" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-text-primary">
                        {highlight.title}
                      </span>
                      <span className="text-sm leading-relaxed text-text-secondary">
                        {highlight.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
