import type { LucideIcon } from "lucide-react";
import { Camera, ChevronLeft, Lock, Mic, Phone, Plus, Video } from "lucide-react";
import { PhoneMockup } from "@/components/product/phone-mockup";
import { cn } from "@/lib/utils/cn";

/**
 * The WhatsApp chrome the product mockups share: a scaled device frame, the
 * chat header, the encryption notice and date divider that open every real
 * thread, and the composer strip that keeps the screen from reading as a
 * cropped screenshot.
 *
 * `PhoneMockup` is a fixed 360×710, so the frame is scaled through `--phone-s`
 * inside a box that reserves the scaled footprint — otherwise the untransformed
 * size would still drive layout and leave a gap beside it.
 *
 * Callers own the thread itself and pass it as `children`. The thread is
 * bottom-anchored and clipped, so the oldest turns crop off the top exactly as
 * they do in a chat that has been scrolled.
 */
export function PhoneChatFrame({
  title,
  subtitle,
  initials,
  icon: Icon,
  encryptionNote,
  dateDivider,
  composerPlaceholder,
  className,
  children,
}: {
  title: string;
  subtitle: string;
  /** Avatar monogram — two letters read cleanly at the scaled size. */
  initials: string;
  /** The mark beside the name: verified business, shield, and so on. */
  icon: LucideIcon;
  encryptionNote: string;
  dateDivider: string;
  composerPlaceholder: string;
  /** Extra classes for the reserved box, e.g. a per-page `--phone-s`. */
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative h-[calc(710px*var(--phone-s))] w-[calc(360px*var(--phone-s))] shrink-0 [--phone-s:0.66] sm:[--phone-s:0.74] lg:[--phone-s:0.78]",
        className
      )}
    >
      <span className="pointer-events-none absolute inset-x-[12%] bottom-[3%] -z-10 h-16 rounded-[50%] bg-brand-dark/22 blur-3xl" />

      <div
        className="absolute start-0 top-0 origin-top-left rtl:origin-top-right"
        style={{ transform: "scale(var(--phone-s))" }}
      >
        <PhoneMockup>
          {/* 646 = PhoneMockup's min-h-[690px] screen less its pt-11 status
              bar. A definite height is what lets the thread crop from the top. */}
          <div className="flex h-[646px] flex-col bg-[#0b141a]">
            <div className="flex shrink-0 items-center gap-2 border-b border-white/5 bg-[#101d25] px-3 pb-2.5 pt-1.5">
              <ChevronLeft className="size-4 shrink-0 text-white/55" aria-hidden="true" />
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/25 text-[13px] font-semibold text-brand">
                {initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1">
                  <span className="truncate text-[13px] font-semibold text-white">{title}</span>
                  <Icon
                    className="size-3.5 shrink-0 text-brand"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                </span>
                <span className="block truncate text-[11px] text-white/45">{subtitle}</span>
              </span>
              <Video className="size-4 shrink-0 text-white/45" aria-hidden="true" />
              <Phone className="size-4 shrink-0 text-white/45" aria-hidden="true" />
            </div>

            <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
              <span className="mx-auto flex items-center gap-1 rounded-md bg-[#182b34] px-2 py-1 text-center text-[9px] leading-3 text-[#ffd279]/80">
                <Lock className="size-2.5 shrink-0" aria-hidden="true" />
                {encryptionNote}
              </span>

              <span className="mx-auto rounded-md bg-[#182b34] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-white/50">
                {dateDivider}
              </span>

              {children}
            </div>

            <div className="flex shrink-0 items-center gap-2 px-3 pb-6 pt-1">
              <span className="flex h-9 flex-1 items-center gap-2 rounded-full bg-[#1f2c33] px-3">
                <Plus className="size-4 shrink-0 text-white/45" aria-hidden="true" />
                <span className="flex-1 truncate text-[12px] text-white/35">
                  {composerPlaceholder}
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
  );
}

/** The three-dot indicator, on whichever side is currently typing. */
export function TypingDots({ side }: { side: "start" | "end" }) {
  return (
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
}

/**
 * A business message with quick-reply buttons attached beneath it, split by
 * hairlines — how WhatsApp renders template buttons, rather than as detached
 * pills beside the bubble.
 */
export function TemplateBubble({
  text,
  time,
  read,
  options,
  children,
}: {
  text: string;
  time: string;
  /** Drives the tick colour: delivered until the reply lands, then read. */
  read: boolean;
  options?: readonly string[];
  children?: React.ReactNode;
}) {
  return (
    <div className="flex animate-[demo-row-in_0.32s_ease-out_both] justify-end">
      <div className="w-[84%] overflow-hidden rounded-2xl rounded-se-sm bg-brand text-white shadow-sm">
        {children}
        <div className="px-3 pb-2 pt-2">
          <p className="text-[13px] leading-[1.45]">{text}</p>
          <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/70">
            {time}
            <svg viewBox="0 0 16 11" className={cn("h-2.5 w-3.5 transition-colors duration-500", read ? "text-sky-400" : "text-white/45")} fill="none" aria-hidden="true">
              <path d="M1 5.5 4 8.5 9.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 5.5 9 8.5 14.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {options?.length ? (
          <div className="border-t border-white/20">
            {options.map((option, index) => (
              <span
                key={option}
                className={cn(
                  "flex animate-[demo-row-in_0.4s_ease-out_both] items-center justify-center py-2 text-[12px] font-semibold text-white",
                  index > 0 && "border-t border-white/20"
                )}
              >
                {option}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
