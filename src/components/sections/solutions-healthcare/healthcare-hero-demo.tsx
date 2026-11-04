"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, BellRing, CalendarCheck2, CheckCircle2, Stethoscope } from "lucide-react";
import { ChatBubble } from "@/components/product/chat-bubble";
import { PanelStat } from "@/components/product/panel-stat";
import {
  PhoneChatFrame,
  TemplateBubble,
  TypingDots,
} from "@/components/product/phone-chat-frame";
import { useDemoLoop } from "@/components/product/use-demo-loop";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type HeroCopy = Dictionary["healthcareSolution"]["hero"];

/** Beats: patient asks → clinic offers services → patient chooses → clinic
 *  offers a slot → confirmed. The last beat holds the finished booking. */
const ASK_MS = 1100;
const SERVICES_MS = 2200;
const CHOICE_TYPING_MS = 1000;
const CHOICE_MS = 1700;
const SLOT_MS = 2000;
const CONFIRMED_MS = 3200;
const DURATIONS = [
  ASK_MS,
  SERVICES_MS,
  CHOICE_TYPING_MS,
  CHOICE_MS,
  SLOT_MS,
  CONFIRMED_MS,
] as const;

/** One consistent day at the clinic; the confirmed rate is derived, not written. */
const BOOKED_TARGET = 128;
const CONFIRMED_TARGET = 94;

const formatCount = (n: number) => n.toLocaleString("en-US");

/**
 * Eased count-up while `active`. State only ever changes inside
 * `requestAnimationFrame` callbacks — never synchronously from the effect body
 * — so the sequence stays free of cascading renders, the same discipline as the
 * marketing and sales hero demos.
 */
function useCountUp(active: boolean, target: number, duration = 750) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      const raf = requestAnimationFrame(() => setCount(0));
      return () => cancelAnimationFrame(raf);
    }

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (start === 0) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, duration, target]);

  return active ? count : 0;
}

/**
 * The healthcare hero mockup: a patient booking an appointment in chat, from
 * the opening question to a confirmed slot with a reminder already scheduled —
 * beside the workspace record the booking created.
 *
 * This replaces a flat SVG screenshot. The gain is not only the device frame:
 * every string now comes from the dictionary, so French and Arabic patients see
 * their own language and the layout mirrors under RTL, which a baked-in image
 * could never do.
 *
 * Runs only while visible, and under `prefers-reduced-motion` renders the
 * finished booking at once. Decorative — the copy beside it carries the
 * meaning, so it is one labelled image to assistive tech.
 */
export function HealthcareHeroDemo({ copy }: { copy: HeroCopy }) {
  const { ref, stage, staticMode } = useDemoLoop(DURATIONS);

  const showAsk = staticMode || stage >= 1;
  const typingPatient = !staticMode && stage === 2;
  const showChoice = staticMode || stage >= 3;
  const showSlot = staticMode || stage >= 4;
  const confirmed = staticMode || stage >= 5;

  const animate = !staticMode;
  const bookedCount = useCountUp(confirmed && animate, BOOKED_TARGET);
  const confirmedCount = useCountUp(confirmed && animate, CONFIRMED_TARGET);

  const stat = (count: number, target: number, of?: number) => {
    const settled = staticMode || count >= target;
    return {
      value: settled ? formatCount(target) : formatCount(count),
      rate: settled && of ? `${Math.round((target / of) * 100)}%` : undefined,
    };
  };

  const booked = stat(bookedCount, BOOKED_TARGET);
  const confirmedStat = stat(confirmedCount, CONFIRMED_TARGET, BOOKED_TARGET);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={copy.imageAlt}
      className="relative mx-auto w-fit"
    >
      <div aria-hidden="true">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-5">
          <PhoneChatFrame
            title={copy.chatTitle}
            subtitle={copy.chatLabel}
            initials="AA"
            icon={BadgeCheck}
            encryptionNote={copy.encryptionNote}
            dateDivider={copy.dateDivider}
            composerPlaceholder={copy.composerPlaceholder}
          >
            {/* The patient opens the thread — a clinic does not cold-message. */}
            <ChatBubble from="customer">
              <span className="text-[13px]">{copy.patientOpening}</span>
              <span className="mt-0.5 flex justify-end text-[10px] text-text-secondary">
                {copy.patientOpeningTime}
              </span>
            </ChatBubble>

            {showAsk ? (
              <TemplateBubble
                text={copy.askService}
                time={copy.askServiceTime}
                read={showChoice}
                options={copy.serviceOptions}
              />
            ) : null}

            {typingPatient ? <TypingDots side="start" /> : null}

            {showChoice ? (
              <div className="animate-[demo-row-in_0.32s_ease-out_both]">
                <ChatBubble from="customer">
                  <span className="text-[13px]">{copy.patientChoice}</span>
                  <span className="mt-0.5 flex justify-end text-[10px] text-text-secondary">
                    {copy.patientChoiceTime}
                  </span>
                </ChatBubble>
              </div>
            ) : null}

            {showSlot ? (
              <TemplateBubble
                text={copy.slotMessage}
                time={copy.slotTime}
                read={confirmed}
                options={confirmed ? undefined : copy.slotOptions}
              />
            ) : null}

            {confirmed ? (
              <div className="flex flex-col items-center gap-1.5 py-0.5">
                <span className="inline-flex animate-[demo-row-in_0.32s_ease-out_both] items-center gap-2 rounded-full border border-brand/45 bg-white px-3 py-1.5 text-[12px] font-semibold text-brand-dark shadow-brand">
                  <CheckCircle2
                    className="size-3.5 text-brand-hover"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  {copy.confirmedLabel}
                </span>
                <span className="animate-[demo-row-in_0.4s_ease-out_both] rounded-lg bg-[#182b34] px-2.5 py-1 text-[10px] text-white/60">
                  {copy.confirmedDetail}
                </span>
                <span className="inline-flex animate-[demo-row-in_0.4s_ease-out_both] items-center gap-1.5 rounded-full border border-ai/30 bg-white px-3 py-1.5 text-[11px] font-medium text-ai-dark">
                  <BellRing className="size-3 text-ai" aria-hidden="true" />
                  {copy.reminderLabel}
                </span>
              </div>
            ) : null}
          </PhoneChatFrame>

          {/* The record the conversation created, synced to the same beats */}
          <div className="hidden w-[276px] shrink-0 lg:mt-6 lg:block">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-white/95 shadow-e4 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full bg-[#28c840] transition-opacity duration-500",
                    confirmed ? "opacity-100" : "opacity-60"
                  )}
                />
                <span className="min-w-0 flex-1 truncate text-xs font-semibold text-text-primary">
                  {copy.panelTitle}
                </span>
                <span className="shrink-0 rounded-full bg-surface-mint px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-brand-hover">
                  {copy.panelStatus}
                </span>
              </div>

              <div className="space-y-3 p-3.5">
                <div className="rounded-lg bg-surface-mint/70 px-2.5 py-2">
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-text-secondary">
                      <CalendarCheck2
                        className="size-3 shrink-0 text-brand-hover"
                        aria-hidden="true"
                      />
                      {copy.nextLabel}
                    </span>
                    {/* Only once it is confirmed. Falling back to the panel's
                        own status here printed "Live" twice in one card. */}
                    {confirmed ? (
                      <span className="animate-[demo-row-in_0.3s_ease-out_both] rounded-full bg-brand/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-brand-hover">
                        {copy.confirmedLabel}
                      </span>
                    ) : null}
                  </span>
                </div>

                <dl className="grid grid-cols-1 gap-y-1.5">
                  {copy.panelRows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-2">
                      <dt className="shrink-0 text-[10px] font-medium uppercase tracking-[0.1em] text-text-secondary">
                        {row.label}
                      </dt>
                      <dd
                        className="truncate text-[11px] font-semibold text-text-primary"
                        dir="auto"
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="grid grid-cols-2 gap-1.5">
                  <PanelStat
                    icon={Stethoscope}
                    label={copy.metricLabels[0]}
                    {...booked}
                  />
                  <PanelStat
                    icon={CheckCircle2}
                    label={copy.metricLabels[1]}
                    {...confirmedStat}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-border bg-surface-mint/60 px-3.5 py-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-ai">
                  <BellRing className="size-3.5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 text-[10px] leading-4 text-text-secondary">
                  {copy.reminderLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-text-secondary">
          <CalendarCheck2 className="size-3.5 text-brand-hover" aria-hidden="true" />
          {copy.visualNote}
        </p>
      </div>
    </div>
  );
}
