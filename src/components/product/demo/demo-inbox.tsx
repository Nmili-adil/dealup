"use client";

import { useCallback } from "react";
import { Check, CheckCheck, ChevronDown, Paperclip, Search, Send } from "lucide-react";
import { DemoStage, type DemoScript } from "./demo-stage";
import { DemoCursor } from "./demo-cursor";
import { cn } from "@/lib/utils/cn";

const agents = ["Sara B.", "Yassine K.", "Imane R."];

const threads = [
  { initial: "I", name: "Issam R.", preview: "ma commande…", time: "10:32", unread: 2, active: true },
  { initial: "N", name: "Nadia T.", preview: "Merci !", time: "10:16", unread: 0, active: false },
  { initial: "K", name: "Karim A.", preview: "Vous livrez à…", time: "09:58", unread: 1, active: false },
];

/** Step 0 idle · 1 dropdown open · 2 agent picked, conversation assigned. */
export function DemoInbox({ label, playing }: { label: string; playing: boolean }) {
  const script: DemoScript = useCallback(async ({ moveTo, click, setStep, wait, isLive }) => {
    await moveTo(84, 16, 0.9);
    if (!isLive()) return;
    await click();
    setStep(1);
    await wait(0.7);
    if (!isLive()) return;

    await moveTo(79, 38, 0.65);
    if (!isLive()) return;
    await click();
    setStep(2);
    await wait(1.5);
  }, []);

  return (
    <DemoStage label={label} script={script} restStep={2} playing={playing}>
      {(step) => (
        <div className="flex h-full text-[8px] leading-tight">
          {/* Conversation list */}
          <div className="hidden w-[34%] shrink-0 flex-col border-e border-border/70 bg-surface-mint/40 sm:flex">
            <div className="flex items-center gap-1 border-b border-border/70 px-2 py-1.5">
              <Search className="size-2 text-text-secondary" />
              <span className="text-text-secondary">Search</span>
            </div>
            {threads.map((t) => (
              <div
                key={t.name}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-1.5",
                  t.active && "bg-white"
                )}
              >
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand/15 text-[7px] font-semibold text-brand-hover">
                  {t.initial}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-semibold text-text-primary">{t.name}</span>
                  <span className="truncate text-text-secondary">{t.preview}</span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-0.5">
                  <span className="tabular-nums text-text-secondary">{t.time}</span>
                  {t.unread ? (
                    <span className="grid size-2.5 place-items-center rounded-full bg-brand text-[6px] font-semibold text-white">
                      {t.unread}
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>

          {/* Thread */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between gap-2 border-b border-border/70 px-2 py-1.5">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/15 text-[7px] font-semibold text-brand-hover">
                  I
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-semibold text-text-primary">Issam R.</span>
                  <span dir="ltr" className="inline-block truncate text-text-secondary">
                    6 74 22 52 40
                  </span>
                </span>
              </span>

              <span
                className={cn(
                  "flex shrink-0 items-center gap-1 rounded-md border px-1.5 py-1 transition-colors duration-200",
                  step >= 1 ? "border-brand/50 bg-surface-mint" : "border-border/70 bg-white"
                )}
              >
                <span className="text-text-secondary">
                  {step >= 2 ? agents[0] : "Assign"}
                </span>
                <ChevronDown className="size-2 text-text-secondary" />
              </span>
            </div>

            <div className="relative flex-1 bg-surface-mint/20 px-2 py-1.5">
              {/* Assignee menu */}
              <div
                className={cn(
                  "absolute end-1 top-0 z-20 w-20 origin-top rounded-lg border border-border/70 bg-white p-1 shadow-e3 transition-all duration-200",
                  step === 1 ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                )}
              >
                {agents.map((agent, index) => (
                  <span
                    key={agent}
                    className={cn(
                      "flex items-center justify-between rounded px-1 py-0.5",
                      index === 0 ? "bg-surface-mint text-brand-hover" : "text-text-secondary"
                    )}
                  >
                    {agent}
                    {index === 0 ? <Check className="size-2" /> : null}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-1">
                <span className="max-w-[78%] rounded-lg rounded-ss-sm bg-white px-1.5 py-1 text-text-primary shadow-e1">
                  Bonjour, ma commande est-elle confirmée ?
                  <span className="mt-0.5 block text-right tabular-nums text-text-secondary">10:32</span>
                </span>
                <span className="ms-auto max-w-[78%] rounded-lg rounded-se-sm bg-brand/15 px-1.5 py-1 text-text-primary">
                  Oui, commande #4821 confirmée ✅
                  <span className="mt-0.5 flex items-center justify-end gap-0.5 tabular-nums text-text-secondary">
                    10:33 <CheckCheck className="size-2 text-brand-hover" />
                  </span>
                </span>
              </div>
            </div>

            {/* Assigned confirmation */}
            <div
              className={cn(
                "mx-2 flex items-center gap-1 rounded-md border border-brand/40 bg-surface-mint px-1.5 py-1 transition-all duration-300",
                step >= 2 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              )}
            >
              <Check className="size-2 text-brand-hover" />
              <span className="font-medium text-brand-hover">Assigned to {agents[0]}</span>
            </div>

            {/* Composer */}
            <div className="flex items-center gap-1 border-t border-border/70 px-2 py-1.5">
              <span className="flex-1 rounded-full bg-surface-mint px-2 py-1 text-text-secondary">
                Type a message…
              </span>
              <Paperclip className="size-2.5 shrink-0 text-text-secondary" />
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Send className="size-2" />
              </span>
            </div>
          </div>

          <DemoCursor />
        </div>
      )}
    </DemoStage>
  );
}
