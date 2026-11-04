"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion as useMotionReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

async function loadScrollTrigger() {
  const gsapModule = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsapModule.gsap.registerPlugin(ScrollTrigger);
  return ScrollTrigger;
}

export function ScrollStory({
  steps,
  visuals,
}: {
  steps: { number: string; title: string; description: string }[];
  visuals: ReactNode[];
}) {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useMotionReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    let cancelled = false;
    let createdTriggers: import("gsap/ScrollTrigger").ScrollTrigger[] = [];

    loadScrollTrigger().then((ScrollTrigger) => {
      if (cancelled) return;
      createdTriggers = stepRefs.current
        .map((el, index) => {
          if (!el) return null;
          return ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActiveIndex(index);
            },
          });
        })
        .filter((trigger) => trigger !== null);
    });

    return () => {
      cancelled = true;
      createdTriggers.forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Progress rail runs behind the steps so the sequence reads as one path. */}
      <ol className="relative flex flex-col gap-4">
        <span
          aria-hidden="true"
          className="absolute inset-y-2 start-7 w-px bg-border"
        />

        {steps.map((step, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={step.number}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              onMouseEnter={() => setActiveIndex(index)}
              className="relative flex gap-5"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 mt-1 grid size-14 shrink-0 place-items-center rounded-full border text-sm font-semibold tabular-nums transition-all duration-300",
                  isActive
                    ? "border-brand/40 bg-white text-brand-hover shadow-brand"
                    : "border-border bg-white text-text-secondary"
                )}
              >
                {step.number}
              </span>

              <div
                className={cn(
                  "flex-1 rounded-2xl border p-5 transition-all duration-300",
                  isActive
                    ? "border-brand/30 bg-white shadow-e2"
                    : "border-transparent bg-transparent"
                )}
              >
                <h3
                  className={cn(
                    "text-xl font-semibold transition-colors duration-300",
                    isActive ? "text-text-primary" : "text-text-primary/70"
                  )}
                >
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="lg:sticky lg:top-28 lg:h-fit">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
          >
            {visuals[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
