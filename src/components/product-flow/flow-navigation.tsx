"use client";

import { useEffect, useRef } from "react";
import { motion, type MotionValue } from "motion/react";
import { BarChart3, MessageSquare, Send, Sparkles, Users } from "lucide-react";
import { FLOW_STAGES, type StageId } from "./flow-stages";
import { cn } from "@/lib/utils/cn";
import type { FlowCopy } from "./flow-copy";

const ICONS: Record<StageId, typeof Send> = {
  campaign: Send,
  reply: MessageSquare,
  automation: Sparkles,
  handover: Users,
  analytics: BarChart3,
};

/**
 * The chapter timeline. Doubles as the section's controls: every chapter is a
 * real button, and the active one carries a progress bar driven straight from
 * the timeline's motion value, so it tracks playback rather than approximating
 * it — and freezes with it when paused.
 */
export function FlowNavigation({
  copy,
  index,
  progress,
  onSelect,
}: {
  copy: FlowCopy;
  index: number;
  progress: MotionValue<number>;
  onSelect: (index: number) => void;
}) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // On narrow screens the row scrolls; keep the active chapter in view when it
  // advances on its own.
  //
  // Scrolls the list itself rather than calling `scrollIntoView`, which walks up
  // to the document and drags the whole page when the row does not overflow —
  // that pulled the section out of view and paused its own playback.
  useEffect(() => {
    const item = itemRefs.current[index];
    const list = listRef.current;
    if (!item || !list) return;
    const overflow = list.scrollWidth - list.clientWidth;
    if (overflow <= 1) return;
    const target = item.offsetLeft - (list.clientWidth - item.clientWidth) / 2;
    list.scrollTo({ left: Math.max(0, Math.min(target, overflow)), behavior: "smooth" });
  }, [index]);

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const prev = rtl ? "ArrowRight" : "ArrowLeft";
    let target: number | null = null;
    if (event.key === next) target = (index + 1) % FLOW_STAGES.length;
    else if (event.key === prev) target = (index - 1 + FLOW_STAGES.length) % FLOW_STAGES.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = FLOW_STAGES.length - 1;
    if (target === null) return;
    event.preventDefault();
    onSelect(target);
    itemRefs.current[target]?.focus();
  }

  return (
    <div
      ref={listRef}
      className="-mx-1 flex snap-x snap-mandatory gap-1.5 overflow-x-auto px-1 pb-1 lg:grid lg:grid-cols-5 lg:overflow-visible"
    >
      {FLOW_STAGES.map((stage, i) => {
        const Icon = ICONS[stage.id];
        const active = i === index;
        const label = copy.stages[i];
        return (
          <button
            key={stage.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            type="button"
            onClick={() => onSelect(i)}
            onKeyDown={onKeyDown}
            aria-current={active ? "step" : undefined}
            className={cn(
              "group relative min-w-[9.5rem] shrink-0 snap-start overflow-hidden rounded-2xl border px-3 py-2.5 text-start transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ef0b5] lg:min-w-0",
              active
                ? "border-white/25 bg-white/10"
                : "border-white/10 hover:border-white/20 hover:bg-white/5"
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold transition-colors duration-300",
                  active ? "bg-[#8ef0b5] text-brand-dark" : "bg-white/10 text-white/60"
                )}
              >
                {active ? <Icon className="size-3" aria-hidden="true" /> : stage.number}
              </span>
              <span
                className={cn(
                  "text-[13px] font-semibold leading-tight transition-colors duration-300",
                  active ? "text-white" : "text-white/60"
                )}
              >
                {label.navTitle}
              </span>
            </span>

            <span
              className={cn(
                "mt-1 block text-[11px] leading-4 transition-colors duration-300",
                active ? "text-white/70" : "text-white/40"
              )}
            >
              {label.description}
            </span>

            {/* Playback progress for the chapter that is currently running. */}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
              {active ? (
                <motion.span
                  className="block h-full bg-[#8ef0b5]"
                  style={{ scaleX: progress, transformOrigin: "left" }}
                />
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
