"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { Check, CheckCheck, Mic, Plus, ShoppingBag, Sparkles, Zap } from "lucide-react";
import { PhoneMockup } from "@/components/product/phone-mockup";
import { Currency } from "@/lib/currency/currency-provider";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Conversation = Dictionary["home"]["workflow"]["conversation"];

/** No-op subscription: the mounted flag never changes after the first render. */
const subscribeNever = () => () => {};

/** Beat length per message, and how long the typing bubble shows first. */
const TYPING_MS = 900;
const READ_MS = 1500;
const LOOP_PAUSE_MS = 2200;

/**
 * A WhatsApp thread that plays itself, message by message, inside the phone
 * mockup — the conversation the flow on the desktop actually produces.
 *
 * Runs only while visible, and under `prefers-reduced-motion` renders the whole
 * thread at once so the story is still readable without any movement.
 */
export function PhoneAutomationChat({
  conversation,
  className,
}: {
  conversation: Conversation;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  const total = conversation.messages.length;

  // Gate on mount so the server and a reduced-motion client render the same
  // markup; swapping straight to "all messages" would fail hydration.
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);
  const staticMode = mounted && Boolean(prefersReducedMotion);
  const visible = staticMode ? total : shown;

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (staticMode || !onScreen) return;

    let cancelled = false;
    let timer: number | undefined;

    const step = (index: number) => {
      if (cancelled) return;

      if (index >= total) {
        timer = window.setTimeout(() => {
          if (cancelled) return;
          setShown(0);
          step(0);
        }, LOOP_PAUSE_MS);
        return;
      }

      const message = conversation.messages[index];
      const advance = () => {
        if (cancelled) return;
        setTyping(false);
        setShown(index + 1);
        timer = window.setTimeout(() => step(index + 1), READ_MS);
      };

      // Only Dealup's own replies "type" — the customer's messages just land.
      if (message.from === "out") {
        setTyping(true);
        timer = window.setTimeout(advance, TYPING_MS);
      } else {
        advance();
      }
    };

    // Scheduled rather than called straight from the effect body: resetting
    // synchronously there triggers a cascading render, and the short beat also
    // gives the thread a moment to settle before the first message lands.
    timer = window.setTimeout(() => {
      if (cancelled) return;
      setShown(0);
      setTyping(false);
      step(0);
    }, 120);

    return () => {
      cancelled = true;
      setTyping(false);
      if (timer) window.clearTimeout(timer);
    };
  }, [conversation.messages, onScreen, staticMode, total]);

  // Keep the newest message in view as the thread grows.
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTo({
      top: node.scrollHeight,
      behavior: staticMode ? "auto" : "smooth",
    });
  }, [visible, typing, staticMode]);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={conversation.srLabel}
      className={cn("relative", className)}
    >
      <div aria-hidden="true">
        <PhoneMockup>
          <div className="flex h-[690px] flex-col bg-[#0b141a]">
            {/* Chat header */}
            <div className="flex shrink-0 items-center gap-2.5 border-b border-white/5 bg-[#1f2c33] px-4 py-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/20 text-sm font-semibold text-brand">
                D
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-sm font-semibold text-white">
                  {conversation.contact}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  {conversation.status}
                </span>
              </span>
            </div>

            {/* Thread */}
            <div
              ref={scrollRef}
              // justify-end anchors the thread to the bottom, the way a real
              // chat sits, instead of floating at the top of a tall screen.
              className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3"
            >
              {conversation.messages.slice(0, visible).map((message, index) => {
                const isOut = message.from === "out";
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex w-full flex-col gap-1",
                      isOut ? "items-end" : "items-start",
                      // Each message lands with a short rise; the global
                      // reduced-motion rule collapses this to nothing.
                      "animate-[demo-row-in_0.32s_ease-out_both]"
                    )}
                  >
                    {message.tag ? (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                          message.tag === "ai"
                            ? "bg-ai/20 text-ai-on-dark"
                            : "bg-brand/15 text-brand"
                        )}
                      >
                        {message.tag === "ai" ? (
                          <Sparkles className="size-2.5" />
                        ) : (
                          <Zap className="size-2.5" />
                        )}
                        {message.tag === "ai" ? conversation.aiTag : conversation.autoTag}
                      </span>
                    ) : null}

                    {message.kind === "options" ? (
                      <span className="flex w-[78%] flex-col overflow-hidden rounded-xl rounded-se-sm bg-[#005c4b] text-white">
                        <span className="flex flex-col divide-y divide-white/10">
                          {conversation.options.map((option) => (
                            <span
                              key={option}
                              className="px-3 py-2 text-center text-[13px] text-emerald-200"
                            >
                              {option}
                            </span>
                          ))}
                        </span>
                      </span>
                    ) : message.kind === "product" ? (
                      <span className="flex w-[78%] flex-col gap-1.5 rounded-xl rounded-se-sm bg-[#005c4b] p-1.5 text-white">
                        <span className="grid h-20 w-full place-items-center rounded-lg bg-white/10">
                          <ShoppingBag className="size-7 text-white/70" />
                        </span>
                        <span className="px-1 text-[13px] font-semibold">
                          {conversation.product.name}
                        </span>
                        <span className="px-1 text-[13px] text-emerald-200">
                          <Currency text={conversation.product.price} />
                        </span>
                        <span className="px-1 pb-0.5 text-[11px] text-white/60">
                          {conversation.product.meta}
                        </span>
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "max-w-[80%] rounded-xl px-3 py-2 text-[13px] leading-snug",
                          isOut
                            ? "rounded-se-sm bg-[#005c4b] text-white"
                            : "rounded-ss-sm bg-[#202c33] text-neutral-100"
                        )}
                      >
                        {message.text}
                        <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/50">
                          10:3{index}
                          {isOut ? (
                            <CheckCheck className="size-3 text-sky-400" />
                          ) : (
                            <Check className="size-3" />
                          )}
                        </span>
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator, shown only while a reply is being composed. */}
              {typing && !staticMode ? (
                <span className="flex items-center gap-1 self-end rounded-xl rounded-se-sm bg-[#005c4b] px-3 py-2.5">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="size-1.5 animate-[demo-typing_1s_ease-in-out_infinite] rounded-full bg-white/70"
                      style={{ animationDelay: `${dot * 0.16}s` }}
                    />
                  ))}
                </span>
              ) : null}
            </div>

            {/* Composer */}
            <div className="flex shrink-0 items-center gap-2 px-3 pb-6 pt-2">
              <Plus className="size-5 shrink-0 text-white/50" />
              <span className="flex-1 rounded-full bg-[#202c33] px-3 py-2 text-[13px] text-white/40">
                {conversation.composer}
              </span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#00a884]">
                <Mic className="size-4 text-white" />
              </span>
            </div>
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
}
