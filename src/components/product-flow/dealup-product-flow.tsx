"use client";

import { motion } from "motion/react";
import { GradientText } from "@/components/ui/titleCustomize";
import { FLOW_EASE } from "./flow-stages";
import { FlowControls } from "./flow-controls";
import { FlowNavigation } from "./flow-navigation";
import { ProductStage } from "./product-stage";
import { useFlowTimeline } from "./use-flow-timeline";
import type { FlowCopy } from "./flow-copy";
import type { Locale } from "@/lib/i18n/locales";
import { Section } from "../layout/section";

/**
 * The end-to-end Dealup story, told as one continuous scene.
 *
 * Campaign → customer reply → AI automation → team handoff → analytics, each
 * chapter caused by the one before it: the message composed on the laptop is
 * the message the phone receives, the reply typed on the phone is what the AI
 * classifies, and that same conversation is what an agent picks up.
 */
export function DealupProductFlow({
  copy,
  locale,
}: {
  copy: FlowCopy;
  locale: Locale;
}) {
  const { index, stageId, beat, progress, isPlaying, reduced, select, toggle, containerRef } =
    useFlowTimeline();

  return (
    <Section id="how-it-works" aria-labelledby="product-flow-title" className="pb-2">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover">
          {copy.eyebrow}
        </p>
        <h2
          id="product-flow-title"
          className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          {copy.headline} <GradientText>{copy.highlight}</GradientText>
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{copy.description}</p>
      </div>

      <div
        ref={containerRef}
        data-flow-stage={stageId}
        data-flow-beat={beat}
        data-flow-running={isPlaying}
        className="mt-9 overflow-hidden rounded-[32px] bg-brand-dark px-4 py-6 shadow-e4 ring-1 ring-white/10 sm:px-7 sm:py-8 lg:px-10"
      >
        <FlowNavigation
          copy={copy}
          index={index}
          progress={progress}
          onSelect={select}
        />

        <div className="mt-6 sm:mt-8">
          <ProductStage
            copy={copy}
            locale={locale}
            stageId={stageId}
            beat={beat}
            reduced={reduced}
          />
        </div>

        {/* The narrative line for the chapter that is playing. */}
        <div className="mt-5 min-h-[3.25rem] sm:mt-6">
          <motion.div
            key={stageId}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: FLOW_EASE }}
            className="mx-auto max-w-md text-center"
          >
            <p className="text-sm font-semibold text-white sm:text-base">
              {copy.stages[index].title}
            </p>
            <p className="mt-1 text-xs leading-5 text-white/60 sm:text-[13px]">
              {copy.stages[index].body}
            </p>
          </motion.div>
        </div>

        <div className="mt-5">
          <FlowControls
            copy={copy.controls}
            index={index}
            isPlaying={isPlaying}
            onToggle={toggle}
            locale={locale}
          />
        </div>
      </div>
    </Section>
  );
}
