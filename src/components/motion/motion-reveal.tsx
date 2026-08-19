"use client";

import { motion, useReducedMotion as useMotionReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function MotionReveal({
  children,
  delay = 0,
  duration = 0.5,
  y = 16,
  x = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  const prefersReducedMotion = useMotionReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : y,
        x: prefersReducedMotion ? 0 : x,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
