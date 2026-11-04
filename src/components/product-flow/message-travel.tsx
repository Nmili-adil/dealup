"use client";

import { motion } from "motion/react";
import { FLOW_EASE } from "./flow-stages";

/**
 * The customer's reply travelling from the phone back into Dealup.
 *
 * This is the join between chapters two and three: the connector draws, a
 * single point of light runs along it, and the automation chapter opens as it
 * lands. Drawn in a stretched viewBox behind both devices.
 */
export function MessageTravel({ active }: { active: boolean }) {
  const path = "M 82 62 C 66 62, 58 40, 34 38";

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full overflow-visible rtl:-scale-x-100"
    >
      <motion.path
        d={path}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.55 : 0 }}
        transition={{ duration: 0.8, ease: FLOW_EASE }}
      />
      {active ? (
        <motion.circle
          r="1.4"
          fill="var(--color-brand)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, times: [0, 0.15, 0.85, 1], ease: "linear" }}
          style={{ offsetPath: `path("${path}")`, offsetRotate: "0deg" }}
        >
          <animateMotion dur="1.5s" repeatCount="1" path={path} />
        </motion.circle>
      ) : null}
    </svg>
  );
}
