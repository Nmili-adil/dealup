"use client";

import { useCallback } from "react";
import { Image as ImageIcon, ListChecks, Maximize2, MessageSquare, Minus, Plus, Split, Zap } from "lucide-react";
import { DemoStage, type DemoScript } from "./demo-stage";
import { DemoCursor } from "./demo-cursor";
import { cn } from "@/lib/utils/cn";

const blocks = [
  { icon: MessageSquare, name: "Message" },
  { icon: ImageIcon, name: "Media" },
  { icon: Split, name: "Condition" },
  { icon: ListChecks, name: "List" },
];

/** Step 0 idle · 1 block picked up · 2 dropped · 3 connector drawn. */
export function DemoAutomation({ label, playing }: { label: string; playing: boolean }) {
  const script: DemoScript = useCallback(async ({ moveTo, click, setStep, wait, isLive }) => {
    await moveTo(17, 40, 0.85);
    if (!isLive()) return;
    await click();
    setStep(1);
    await wait(0.35);
    if (!isLive()) return;

    // Slower across the canvas, so the block reads as carried.
    await moveTo(70, 62, 1.05);
    if (!isLive()) return;
    setStep(2);
    await click();
    await wait(0.4);
    if (!isLive()) return;

    setStep(3);
    await wait(1.4);
  }, []);

  return (
    <DemoStage label={label} script={script} restStep={3} playing={playing}>
      {(step) => (
        <div className="flex h-full flex-col text-[8px] leading-tight">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2 border-b border-border/70 px-2 py-1.5">
            <span className="flex items-center gap-1">
              <Zap className="size-2 text-brand-hover" />
              <span className="font-semibold text-text-primary">Welcome flow</span>
              <span className="rounded bg-surface-mint px-1 py-0.5 text-brand-hover">Draft</span>
            </span>
            <span className="rounded bg-brand px-1.5 py-0.5 font-medium text-white">Save</span>
          </div>

          <div className="flex min-h-0 flex-1">
            {/* Palette */}
            <div className="flex w-[32%] shrink-0 flex-col gap-1 border-e border-border/70 p-1.5">
              <span className="text-text-secondary">Blocks</span>
              {blocks.map((block, index) => (
                <span
                  key={block.name}
                  className={cn(
                    "flex items-center gap-1 rounded-md border px-1.5 py-1 transition-all duration-200",
                    index === 0 && step >= 1
                      ? "border-brand/50 bg-surface-mint opacity-40"
                      : "border-border/70 bg-white"
                  )}
                >
                  <block.icon className="size-2 text-brand-hover" />
                  <span className="text-text-primary">{block.name}</span>
                </span>
              ))}
            </div>

            {/* Canvas */}
            <div className="relative flex-1 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[10px_10px]">
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md border border-brand/40 bg-white px-1.5 py-1 shadow-e1">
                <Zap className="size-2 text-brand-hover" />
                <span className="text-text-primary">Trigger</span>
                <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand" />
              </span>

              <svg
                className="absolute inset-0 size-full text-brand/60"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M20 16 C 20 46, 50 40, 58 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  vectorEffect="non-scaling-stroke"
                  className={cn(
                    "transition-opacity duration-500",
                    step >= 3 ? "opacity-100" : "opacity-0"
                  )}
                />
              </svg>

              <span
                className={cn(
                  "absolute left-[46%] top-[52%] flex items-center gap-1 rounded-md border border-brand/40 bg-white px-1.5 py-1 shadow-e1 transition-all duration-300",
                  step >= 2 ? "scale-100 opacity-100" : "scale-90 opacity-0"
                )}
              >
                <MessageSquare className="size-2 text-brand-hover" />
                <span className="text-text-primary">Message</span>
                <span className="absolute -top-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand" />
              </span>

              {/* Zoom controls */}
              <span className="absolute bottom-1.5 left-1.5 flex flex-col overflow-hidden rounded border border-border/70 bg-white">
                {[Plus, Minus, Maximize2].map((Icon, i) => (
                  <span key={i} className="grid size-3 place-items-center text-text-secondary">
                    <Icon className="size-1.5" />
                  </span>
                ))}
              </span>
            </div>
          </div>

          <DemoCursor />
        </div>
      )}
    </DemoStage>
  );
}
