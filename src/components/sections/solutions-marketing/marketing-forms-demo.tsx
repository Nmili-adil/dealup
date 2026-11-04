"use client";

import { BadgeCheck, Check, Globe, Loader2, Lock, UserPlus } from "lucide-react";
import { PhoneMockup } from "@/components/product/phone-mockup";
import { useDemoLoop } from "@/components/product/use-demo-loop";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type FormsCopy = Dictionary["marketingSolution"]["forms"];

/**
 * Beats: idle → name typed → phone typed → consent ticked → submitting →
 * subscribed. The last beat is the settled state, which is what reduced motion
 * rests on.
 */
const IDLE_MS = 700;
const NAME_MS = 1100;
const PHONE_MS = 1200;
const CONSENT_MS = 700;
const SUBMIT_MS = 900;
const DONE_MS = 3000;
const DURATIONS = [IDLE_MS, NAME_MS, PHONE_MS, CONSENT_MS, SUBMIT_MS, DONE_MS] as const;

const STAGE_NAME = 1;
const STAGE_PHONE = 2;
const STAGE_CONSENT = 3;
const STAGE_SUBMIT = 4;
const STAGE_DONE = 5;

/**
 * A field whose value is revealed left-to-right behind a mask, with the caret
 * riding the trailing edge — the CSS does the typing, so no per-character state
 * and nothing to re-render mid-word.
 */
function TypedField({
  label,
  value,
  typing,
  filled,
  durationMs,
}: {
  label: string;
  value: string;
  typing: boolean;
  filled: boolean;
  durationMs: number;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium text-white/60">{label}</span>
      <span
        className={cn(
          "mt-1 flex h-[38px] items-center rounded-xl border px-3 text-[13px] transition-colors duration-300",
          typing
            ? "border-brand/60 bg-white/8 text-white"
            : filled
              ? "border-white/12 bg-white/5 text-white"
              : "border-white/12 bg-white/5 text-white/25"
        )}
      >
        {filled || typing ? (
          <span className="inline-flex min-w-0 items-center">
            <span
              className="inline-block overflow-hidden whitespace-nowrap"
              style={
                typing
                  ? { animation: `demo-type ${durationMs}ms steps(24, end) both` }
                  : undefined
              }
            >
              {value}
            </span>
            {typing ? (
              <span className="ms-px inline-block h-4 w-px shrink-0 animate-[demo-typing_1s_ease-in-out_infinite] bg-brand" />
            ) : null}
          </span>
        ) : (
          <span className="h-4 w-px bg-white/20" />
        )}
      </span>
    </label>
  );
}

/**
 * The forms mockup: a subscribe form on the shop's own site, filling itself in
 * and submitting, then resolving into the contact record it created — the
 * segment it landed in and the consent that was captured with it.
 *
 * Framed inside a browser chrome bar because the section's claim is that these
 * forms live on your site and as shareable links; without the chrome the same
 * screen reads as an app, which is a different product.
 *
 * Decorative: the copy beside it carries the meaning, so the whole unit is one
 * labelled image to assistive tech.
 */
export function MarketingFormsDemo({ copy }: { copy: FormsCopy }) {
  const { ref, stage, staticMode } = useDemoLoop(DURATIONS);

  const typingName = !staticMode && stage === STAGE_NAME;
  const typingPhone = !staticMode && stage === STAGE_PHONE;
  const nameFilled = stage >= STAGE_PHONE;
  const phoneFilled = stage >= STAGE_CONSENT;
  const consented = stage >= STAGE_CONSENT;
  const submitting = !staticMode && stage === STAGE_SUBMIT;
  const done = stage >= STAGE_DONE;

  return (
    <div ref={ref} role="img" aria-label={copy.title} className="mx-auto w-fit">
      <div aria-hidden="true">
        <PhoneMockup className="mx-auto">
          {/* 646 = PhoneMockup's min-h-[690px] screen less its pt-11 status bar. */}
          <div className="flex h-[646px] flex-col bg-neutral-950">
            {/* Browser chrome: these forms live on the shop's own site. */}
            <div className="flex shrink-0 items-center gap-2 border-b border-white/8 px-3 pb-2 pt-1">
              <Globe className="size-3.5 shrink-0 text-white/35" aria-hidden="true" />
              <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-1">
                <Lock className="size-2.5 shrink-0 text-[#8ef0b5]" aria-hidden="true" />
                <span dir="ltr" className="truncate text-[10px] text-white/55">
                  {copy.browserUrl}
                </span>
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-3 py-4">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-white">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/25 text-brand">
                  <UserPlus className="size-3.5" aria-hidden="true" />
                </span>
                {copy.formTitle}
              </p>

              <div className="mt-4 space-y-2.5">
                <TypedField
                  label={copy.fields[0]}
                  value={copy.values[0]}
                  typing={typingName}
                  filled={nameFilled}
                  durationMs={NAME_MS}
                />
                <TypedField
                  label={copy.fields[1]}
                  value={copy.values[1]}
                  typing={typingPhone}
                  filled={phoneFilled}
                  durationMs={PHONE_MS}
                />
              </div>

              {/* Consent is a field, not fine print — the section's promise is
                  that it is captured with the contact. */}
              <span className="mt-3.5 flex items-start gap-2">
                <span
                  className={cn(
                    "mt-px grid size-4 shrink-0 place-items-center rounded border transition-colors duration-300",
                    consented ? "border-brand bg-brand text-white" : "border-white/25 bg-white/5"
                  )}
                >
                  {consented ? <Check className="size-3" strokeWidth={3.2} /> : null}
                </span>
                <span className="text-[10px] leading-4 text-white/55">{copy.consentLabel}</span>
              </span>

              <span
                className={cn(
                  "mt-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white transition-colors duration-300",
                  submitting || done ? "bg-brand-hover" : "bg-brand"
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    {copy.submittingLabel}
                  </>
                ) : done ? (
                  <>
                    <Check className="size-3.5" strokeWidth={3} />
                    {copy.successTitle}
                  </>
                ) : (
                  copy.submitLabel
                )}
              </span>

              {/* What the visitor is opting into, until they have. The perks
                  and the contact record below share this space at opposite
                  beats — each is only meaningful on its own side of the
                  submit, so they swap rather than stack. */}
              {done ? null : (
              <ul className="mt-3.5 space-y-1.5">
                {copy.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-[11px] leading-4 text-white/55">
                    <Check
                      className="mt-0.5 size-3 shrink-0 text-brand"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    {perk}
                  </li>
                ))}
              </ul>
              )}

              {/* The record the form produced. This is the payoff — the form is
                  only interesting because of what lands on the other side. */}
              {done ? (
                <div className="mt-3.5 animate-[demo-row-in_0.4s_ease-out_both] rounded-2xl border border-brand/25 bg-brand/8 p-3">
                  <span className="flex items-center gap-2">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/25 text-[11px] font-semibold text-brand">
                      SB
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-semibold text-white">
                        {copy.values[0]}
                      </span>
                      <span dir="ltr" className="block truncate text-start text-[10px] text-white/50">
                        {copy.values[1]}
                      </span>
                    </span>
                    <BadgeCheck className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  </span>

                  <span className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-brand/20 px-2 py-0.5 text-[10px] font-medium text-[#8ef0b5]">
                      {copy.segmentLabel}
                    </span>
                    <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium text-white/60">
                      {copy.sourceLabel}
                    </span>
                  </span>

                  <span className="mt-2 flex items-start gap-1.5 text-[10px] leading-4 text-white/50">
                    <Lock className="mt-0.5 size-2.5 shrink-0 text-[#8ef0b5]" aria-hidden="true" />
                    {copy.successNote}
                  </span>
                </div>
              ) : null}

              {done ? (
                <span className="mt-3 inline-flex animate-[demo-row-in_0.4s_ease-out_both] items-center gap-1.5 self-start rounded-full bg-brand/15 px-3 py-1.5 text-[11px] font-medium text-[#8ef0b5]">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  {copy.toastLabel}
                </span>
              ) : null}

              {/* Spacer, then the page's own footer — so the screen ends where
                  a page ends instead of trailing off into empty black. */}
              <span className="flex-1" />

              <span className="flex items-start gap-1.5 border-t border-white/8 pt-3 text-[10px] leading-4 text-white/40">
                <Lock className="mt-0.5 size-2.5 shrink-0" aria-hidden="true" />
                {copy.privacyNote}
              </span>
            </div>
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
}
