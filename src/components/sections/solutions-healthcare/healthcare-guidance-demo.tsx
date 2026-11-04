"use client";

import { ShieldCheck } from "lucide-react";
import { ChatBubble } from "@/components/product/chat-bubble";
import {
  PhoneChatFrame,
  TemplateBubble,
  TypingDots,
} from "@/components/product/phone-chat-frame";
import { useDemoLoop } from "@/components/product/use-demo-loop";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type GuidanceCopy = Dictionary["healthcareSolution"]["guidance"];

/** Beats: opening turns → language options → patient answers → slot offered. */
const OPENING_MS = 1600;
const OPTIONS_MS = 2000;
const REPLY_TYPING_MS = 1000;
const REPLY_MS = 1800;
const SETTLED_MS = 3000;
const DURATIONS = [OPENING_MS, OPTIONS_MS, REPLY_TYPING_MS, REPLY_MS, SETTLED_MS] as const;

/**
 * The guidance mockup: a patient question resolving into a concrete next step,
 * with the note that only what the next step needs was collected.
 *
 * Replaces a flat SVG card. Driven from the dictionary, so the conversation
 * reads in the patient's own language and mirrors under RTL.
 */
export function HealthcareGuidanceDemo({ copy }: { copy: GuidanceCopy }) {
  const { ref, stage, staticMode } = useDemoLoop(DURATIONS);

  const showOptions = staticMode || stage >= 1;
  const typingPatient = !staticMode && stage === 2;
  const showReply = staticMode || stage >= 3;
  const showSlot = staticMode || stage >= 4;

  return (
    <div ref={ref} role="img" aria-label={copy.imageAlt} className="mx-auto w-fit">
      <div aria-hidden="true">
        <PhoneChatFrame
          title={copy.chatTitle}
          subtitle={copy.chatLabel}
          initials="AA"
          icon={ShieldCheck}
          encryptionNote={copy.encryptionNote}
          dateDivider={copy.dateDivider}
          composerPlaceholder={copy.composerPlaceholder}
          className="lg:[--phone-s:0.72]"
        >
          {copy.turns.map((turn) =>
            turn.from === "patient" ? (
              <ChatBubble key={turn.time + turn.text} from="customer">
                <span className="text-[13px]">{turn.text}</span>
                <span className="mt-0.5 flex justify-end text-[10px] text-text-secondary">
                  {turn.time}
                </span>
              </ChatBubble>
            ) : showOptions ? (
              <TemplateBubble
                key={turn.time + turn.text}
                text={turn.text}
                time={turn.time}
                read={showReply}
                options={copy.languageOptions}
              />
            ) : null
          )}

          {typingPatient ? <TypingDots side="start" /> : null}

          {showReply ? (
            <div className="animate-[demo-row-in_0.32s_ease-out_both]">
              <ChatBubble from="customer">
                <span className="text-[13px]">{copy.patientReply}</span>
                <span className="mt-0.5 flex justify-end text-[10px] text-text-secondary">
                  {copy.patientReplyTime}
                </span>
              </ChatBubble>
            </div>
          ) : null}

          {showSlot ? (
            <TemplateBubble text={copy.clinicReply} time={copy.clinicReplyTime} read={false} />
          ) : null}

          {/* What the conversation captured, and what it deliberately did not.
              The restraint is the section's promise, so it stays on screen. */}
          {showSlot ? (
            <span className="mx-auto flex animate-[demo-row-in_0.4s_ease-out_both] flex-col items-center gap-0.5 rounded-lg bg-[#182b34] px-2.5 py-1.5 text-center text-[9px] leading-3 text-white/55">
              <span>{copy.collectedLabel}</span>
              <span className="text-[#8ef0b5]">{copy.privacyNote}</span>
            </span>
          ) : null}
        </PhoneChatFrame>
      </div>
    </div>
  );
}
