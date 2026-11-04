"use client";

import { CircleCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Mockup } from "@/components/product/mockup";

export function HeroVisual({ alt }: { alt: string }) {
  const prefersReducedMotion = useReducedMotion();

  const entrance = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const };

  // `initial` must not branch on `prefersReducedMotion`: the server cannot know
  // the media query, so a reduced-motion client would render a different
  // transform and fail hydration. `entrance` already collapses the duration to
  // 0 when reduced, which snaps these into place without any movement.
  return (
    <div className="relative mx-auto min-h-[410px] w-full max-w-[720px] sm:min-h-[460px] lg:min-h-[540px]">
      <motion.div
        className="absolute left-[1%] top-[1%] z-10 w-[62%] sm:left-[3%] sm:top-0 sm:w-[59%]"
        initial={{ opacity: 0, y: 42 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...entrance, delay: 0.22 }}
      >
        <Mockup
          name="hero-customer"
          alt={alt}
          sizes="(min-width: 1024px) 34vw, 62vw"
          ratio="481 / 1134"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute right-[1%] top-[7%] z-20 w-[47%] sm:right-[2%] sm:top-[5%] sm:w-[45%]"
        initial={{ opacity: 0, x: 48, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ ...entrance, delay: 0.48 }}
      >
        <motion.div
          // animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
          // transition={
          //   prefersReducedMotion
          //     ? undefined
          //     : { duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          // }
        >
          <Mockup
            name="hero-commerce-phone"
            alt="A Dealup WhatsApp commerce conversation showing a leather bag and a confirmed order."
            sizes="(min-width: 1024px) 27vw, 47vw"
            ratio="800 / 1199"
            priority
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-[7%] top-[69%] z-30 flex max-w-[210px] items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-e3 backdrop-blur sm:right-[9%]"
        initial={{ opacity: 0, y: 22, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...entrance, delay: 0.82 }}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-mint text-brand-hover">
          <CircleCheck className="size-5" aria-hidden="true" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-xs font-semibold text-text-primary">Command confirmed</span>
          <span className="mt-1 text-[11px] text-text-secondary">Dealup handled the follow-up</span>
        </span>
      </motion.div>
    </div>
  );
}
