"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";

/**
 * The scripted pointer used by the feature demos.
 *
 * Positioned in percent so it tracks the stage at any width, and translated
 * with `x`/`y` percentages rather than `left`/`top` so movement stays on the
 * compositor instead of triggering layout on every frame.
 */
export const DemoCursor = forwardRef<HTMLDivElement, { className?: string }>(
  function DemoCursor({ className }, ref) {
    return (
      <motion.div
        ref={ref}
        data-demo-cursor
        aria-hidden="true"
        className={cn("pointer-events-none absolute left-0 top-0 z-30", className)}
        initial={false}
      >
        {/* Click ripple. Scaled from the arrow tip, so it reads as a press. */}
        <span
          data-demo-ripple
          className="absolute -left-2 -top-2 block size-8 scale-0 rounded-full bg-brand/35 opacity-0"
        />

        <svg
          viewBox="0 0 24 24"
          className="relative size-6 drop-shadow-[0_2px_4px_rgba(11,18,32,0.35)]"
          fill="none"
        >
          <path
            d="M5 3.5 18.5 12l-5.9 1.2L9.9 19 5 3.5Z"
            fill="white"
            stroke="#0b1220"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    );
  }
);
