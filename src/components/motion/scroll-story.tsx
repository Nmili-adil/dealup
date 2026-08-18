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
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
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
      <div className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <div
            key={step.number}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            onMouseEnter={() => setActiveIndex(index)}
            className={cn(
              "cursor-default rounded-2xl border p-6 transition-colors",
              activeIndex === index
                ? "border-brand/40 bg-surface-mint"
                : "border-border bg-white"
            )}
          >
            <span
              className={cn(
                "text-sm font-semibold",
                activeIndex === index ? "text-brand-hover" : "text-text-muted"
              )}
            >
              {step.number}
            </span>
            <h3 className="mt-1 text-xl font-semibold text-text-primary">{step.title}</h3>
            <p className="mt-2 text-text-secondary">{step.description}</p>
          </div>
        ))}
      </div>

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
