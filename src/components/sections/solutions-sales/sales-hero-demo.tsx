"use client";

import {
  BadgeCheck,
  Camera,
  Check,
  CheckCheck,
  ChevronLeft,
  CornerUpLeft,
  Lock,
  Megaphone,
  Mic,
  Phone,
  Plus,
  ShieldCheck,
  TvMinimalPlay,
  UserCheck,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ChatBubble } from "@/components/product/chat-bubble";
import { Mockup } from "@/components/product/mockup";
import { PanelStat } from "@/components/product/panel-stat";
import { PhoneMockup } from "@/components/product/phone-mockup";
import { useDemoLoop } from "@/components/product/use-demo-loop";
import { Currency } from "@/lib/currency/currency-provider";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type HeroCopy = Dictionary["salesSolution"]["hero"];

/** Stage beats: bot typing → question + replies → lead typing → reply → qualify → done.
 *  The last beat doubles as the hold on the finished thread. */
const TYPING_MS = 1000;
const QUESTION_MS = 2200;
const REPLY_TYPING_MS = 1000;
const REPLY_MS = 1600;
const QUALIFY_MS = 1400;
const LOOP_PAUSE_MS = 3000;
const DURATIONS = [
  TYPING_MS,
  QUESTION_MS,
  REPLY_TYPING_MS,
  REPLY_MS,
  QUALIFY_MS,
  LOOP_PAUSE_MS,
] as const;

/**
 * One consistent day. The qualified rate shown in the panel is derived from
 * these rather than written beside them, so the two figures cannot drift.
 */
const LEADS_TARGET = 324;
const QUALIFIED_TARGET = 141;
/** The score the meter settles on. It owns this figure — the panel's rows
 *  deliberately no longer repeat it. */
const SCORE_TARGET = 84;

const formatCount = (n: number) => n.toLocaleString("en-US");

/**
 * Eased count-up while `active`; used for the live pipeline numbers.
 *
 * State only ever changes inside `requestAnimationFrame` callbacks — never
 * synchronously from the effect body — so the sequence stays free of cascading
 * renders (the same discipline as `marketing-hero-demo` and
 * `phone-automation-chat`). The deactivation reset is itself deferred one
 * frame so the value renders as zero immediately and the reset cannot paint a
 * stale finished number between re-activations.
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
 * The sales hero mockup: a qualification conversation that plays itself until
 * the lead scores as qualified and lands on an agent's desk — with a live lead
 * panel whose score and pipeline figures tick up alongside it.
 *
 * The thread opens on the ad referral card WhatsApp attaches when someone
 * arrives from a click-to-WhatsApp ad. That card is what makes the panel's
 * "Source: Click-to-WhatsApp ad" row true on screen rather than merely
 * asserted, which is the whole claim of the section above it.
 *
 * The phone is the shared `PhoneMockup` scaled through `--phone-s` inside a
 * reserved box, so the frame keeps its proportions and the panel sits beside it
 * rather than on top of it.
 *
 * Runs only while visible, and under `prefers-reduced-motion` renders the whole
 * conversation and final numbers at once so the story is still readable without
 * movement. The unit is decorative (the copy beside it carries the meaning), so
 * it is exposed to assistive tech as a single labelled image.
 */
export function SalesHeroDemo({ copy }: { copy: HeroCopy }) {
  const { ref: rootRef, stage, staticMode } = useDemoLoop(DURATIONS);

  // Stage → what is on screen. Static mode shows the finished conversation.
  const typingBot = !staticMode && (stage === 0 || stage === 4);
  const showQuestion = staticMode || stage >= 1;
  const typingCustomer = !staticMode && stage === 2;
  const showCustomer = staticMode || stage >= 3;
  const qualified = staticMode || stage >= 5;

  const animate = !staticMode;
  const leadsCount = useCountUp(qualified && animate, LEADS_TARGET);
  const qualifiedCount = useCountUp(qualified && animate, QUALIFIED_TARGET);
  const scoreCount = useCountUp(showCustomer && animate, SCORE_TARGET, 900);

  /** Settled figures win once the count-up lands; the rate waits for them. */
  const stat = (count: number, target: number, of?: number) => {
    const settled = staticMode || count >= target;
    return {
      value: settled ? formatCount(target) : formatCount(count),
      rate: settled && of ? `${Math.round((target / of) * 100)}%` : undefined,
    };
  };

  const leads = stat(leadsCount, LEADS_TARGET);
  const qualifiedStat = stat(qualifiedCount, QUALIFIED_TARGET, LEADS_TARGET);
  const score = staticMode || scoreCount >= SCORE_TARGET ? SCORE_TARGET : scoreCount;

  const typingDots = (side: "start" | "end") => (
    <span
      className={cn(
        "flex items-center gap-1 px-2",
        side === "end" ? "self-end" : "self-start"
      )}
      role="presentation"
    >
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="size-1.5 animate-[demo-typing_1s_ease-in-out_infinite] rounded-full bg-white/40"
          style={{ animationDelay: `${dot * 0.16}s` }}
        />
      ))}
    </span>
  );

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={copy.visualNote}
      className="relative mx-auto w-fit"
    >
      <div aria-hidden="true">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-5">
          {/* Reserved box for the scaled phone: `PhoneMockup` is a fixed frame,
              so the wrapper holds the scaled footprint and the frame is
              transformed inside it. */}
          <div className="relative h-[calc(710px*var(--phone-s))] w-[calc(360px*var(--phone-s))] shrink-0 [--phone-s:0.66] sm:[--phone-s:0.74] lg:[--phone-s:0.78]">
            <span className="pointer-events-none absolute inset-x-[12%] bottom-[3%] -z-10 h-16 rounded-[50%] bg-brand-dark/22 blur-3xl" />

            <div
              className="absolute start-0 top-0 origin-top-left rtl:origin-top-right"
              style={{ transform: "scale(var(--phone-s))" }}
            >
              <PhoneMockup>
                {/* 646 = PhoneMockup's min-h-[690px] screen less its pt-11
                    status bar. A definite height is what lets the thread crop
                    from the top the way a scrolled chat does. */}
                <div className="flex h-[646px] flex-col bg-[#0b141a]">
                  {/* Chat header, as the business's device shows it */}
                  <div className="flex shrink-0 items-center gap-2 border-b border-white/5 bg-[#101d25] px-3 pb-2.5 pt-1.5">
                    <ChevronLeft className="size-4 shrink-0 text-white/55" aria-hidden="true" />
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/25 text-[13px] font-semibold text-brand">
                      SB
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1">
                        <span className="truncate text-[13px] font-semibold text-white">
                          {copy.chatTitle}
                        </span>
                        <ShieldCheck
                          className="size-3.5 shrink-0 text-brand"
                          strokeWidth={2.4}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="block truncate text-[11px] text-white/45">
                        {copy.chatLabel}
                      </span>
                    </span>
                    <Video className="size-4 shrink-0 text-white/45" aria-hidden="true" />
                    <Phone className="size-4 shrink-0 text-white/45" aria-hidden="true" />
                  </div>

                  {/* Thread, anchored to the bottom the way a real chat sits */}
                  <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
                    <span className="mx-auto flex items-center gap-1 rounded-md bg-[#182b34] px-2 py-1 text-center text-[9px] leading-3 text-[#ffd279]/80">
                      <Lock className="size-2.5 shrink-0" aria-hidden="true" />
                      {copy.encryptionNote}
                    </span>

                    <span className="mx-auto rounded-md bg-[#182b34] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-white/50">
                      {copy.dateDivider}
                    </span>

                    {/* The ad referral card WhatsApp attaches when a chat is
                        opened from a click-to-WhatsApp ad. It is the evidence
                        for the panel's Source row. */}
                    <div className="flex justify-start">
                      <div className="w-[86%] overflow-hidden rounded-2xl rounded-ss-sm bg-[#1f2c33] shadow-sm">
                        <Mockup
                          name="campaign-creative-ceramics"
                          alt={copy.adImageAlt}
                          ratio="12 / 5"
                          sizes="260px"
                          className="h-[70px] w-full object-cover"
                        />
                        <div className="px-2.5 pb-2 pt-1.5">
                          <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-white/45">
                            <Megaphone className="size-2.5" aria-hidden="true" />
                            {copy.adLabel}
                          </span>
                          <p className="mt-0.5 text-[11px] font-medium leading-4 text-white/85">
                            {copy.adHeadline}
                          </p>
                          <span className="mt-1.5 block rounded-lg bg-white/8 py-1 text-center text-[11px] font-semibold text-[#53bdeb]">
                            {copy.adCta}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="mx-auto flex items-center gap-1 rounded-md bg-[#182b34] px-2 py-1 text-[9px] leading-3 text-white/45">
                      <CornerUpLeft className="size-2.5 shrink-0" aria-hidden="true" />
                      {copy.adContextLabel}
                    </span>

                    {/* The message the ad pre-filled and the lead sent. It is
                        always present — it is what opened the thread, and it is
                        why the business replies with a qualifying question. */}
                    <ChatBubble from="customer">
                      <span className="text-[13px]">{copy.prefilledMessage}</span>
                      <span className="mt-0.5 flex justify-end text-[10px] text-text-secondary">
                        {copy.prefilledTime}
                      </span>
                    </ChatBubble>

                    {showQuestion ? (
                      <div className="flex animate-[demo-row-in_0.32s_ease-out_both] justify-end">
                        <div className="w-[84%] overflow-hidden rounded-2xl rounded-se-sm bg-brand text-white shadow-sm">
                          <div className="px-3 pb-2 pt-2">
                            <p className="text-[13px] leading-[1.45]">{copy.messageText}</p>
                            <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/70">
                              {copy.agentTime}
                              <CheckCheck
                                className={cn(
                                  "size-3 transition-colors duration-500",
                                  showCustomer ? "text-sky-400" : "text-white/45"
                                )}
                              />
                            </span>
                          </div>

                          {/* Quick replies attached under the body, split by
                              hairlines — how WhatsApp renders template buttons. */}
                          <div className="border-t border-white/20">
                            {copy.replyOptions.map((option, index) => (
                              <span
                                key={option}
                                className={cn(
                                  "flex animate-[demo-row-in_0.4s_ease-out_both] items-center justify-center gap-1.5 py-2 text-[12px] font-semibold text-white",
                                  index > 0 && "border-t border-white/20"
                                )}
                              >
                                <CornerUpLeft className="size-3" aria-hidden="true" />
                                <Currency text={option} />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {typingBot ? typingDots("end") : null}

                    {showCustomer ? (
                      <div className="animate-[demo-row-in_0.32s_ease-out_both]">
                        <ChatBubble from="customer">
                          <Currency text={copy.customerMessage} />
                          <span className="mt-1 flex justify-end text-[10px] text-text-secondary">
                            {copy.customerTime}
                          </span>
                        </ChatBubble>
                      </div>
                    ) : null}

                    {typingCustomer ? typingDots("start") : null}

                    {qualified ? (
                      <div className="flex flex-col items-center gap-1.5 py-0.5">
                        <span className="inline-flex animate-[demo-row-in_0.32s_ease-out_both] items-center gap-2 rounded-full border border-brand/45 bg-white px-3 py-1.5 text-[12px] font-semibold text-brand-dark shadow-brand">
                          <BadgeCheck
                            className="size-3.5 text-brand-hover"
                            strokeWidth={2.2}
                            aria-hidden="true"
                          />
                          {copy.qualifiedLabel}
                        </span>
                        <span className="inline-flex animate-[demo-row-in_0.4s_ease-out_both] items-center gap-2 rounded-full border border-ai/30 bg-white px-3 py-1.5 text-[12px] font-medium text-ai-dark">
                          <span className="grid size-4 place-items-center rounded-full bg-ai/15 text-[9px] font-semibold text-ai">
                            SA
                          </span>
                          {copy.assignedLabel}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Composer — the strip that makes the frame read as a live
                      chat rather than a cropped screenshot. */}
                  <div className="flex shrink-0 items-center gap-2 px-3 pb-6 pt-1">
                    <span className="flex h-9 flex-1 items-center gap-2 rounded-full bg-[#1f2c33] px-3">
                      <Plus className="size-4 shrink-0 text-white/45" aria-hidden="true" />
                      <span className="flex-1 truncate text-[12px] text-white/35">
                        {copy.composerPlaceholder}
                      </span>
                      <Camera className="size-4 shrink-0 text-white/45" aria-hidden="true" />
                    </span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Mic className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </PhoneMockup>
            </div>
          </div>

          {/* Live lead panel, synced to the same beats */}
          <div className="hidden w-[276px] shrink-0 lg:mt-6 lg:block">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-white/95 shadow-e4 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full bg-[#28c840] transition-opacity duration-500",
                    qualified ? "opacity-100" : "opacity-60"
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
                <p className="text-[11px] leading-4 text-text-secondary">
                  {copy.floaterSummary}
                </p>

                {/* The score the conversation produced, as a meter rather than
                    a number alone — it is the panel's headline. */}
                <div className="rounded-lg bg-surface-mint/70 px-2.5 py-2">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-[10px] font-medium text-text-secondary">
                      {copy.scoreLabel}
                    </span>
                    <span className="text-[15px] font-semibold tabular-nums text-brand-dark">
                      {score}
                      <span className="text-[10px] font-medium text-text-secondary">/100</span>
                    </span>
                  </span>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white">
                    <span
                      className="block h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
                      style={{ width: `${score}%` }}
                    />
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
                  <PanelStat icon={UserCheck} label={copy.metricLabels[0]} {...leads} />
                  <PanelStat
                    icon={BadgeCheck}
                    label={copy.metricLabels[1]}
                    {...qualifiedStat}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-border bg-surface-mint/60 px-3.5 py-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-brand-hover">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-text-primary">
                  {copy.assignedLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-text-secondary">
          <TvMinimalPlay className="size-3.5 text-brand-hover" aria-hidden="true" />
          {copy.visualNote}
        </p>
      </div>
    </div>
  );
}
