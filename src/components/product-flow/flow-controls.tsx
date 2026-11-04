"use client";

import { Pause, Play } from "lucide-react";
import { TOTAL_STAGES } from "./flow-stages";
import type { FlowCopy } from "./flow-copy";

/** Pause/resume plus a plain "chapter n of 5" readout. */
export function FlowControls({
  copy,
  index,
  isPlaying,
  onToggle,
  locale,
}: {
  copy: FlowCopy["controls"];
  index: number;
  isPlaying: boolean;
  onToggle: () => void;
  locale: string;
}) {
  const format = (n: number) =>
    new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(n);

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={!isPlaying}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-white/45 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ef0b5]"
      >
        {isPlaying ? (
          <Pause className="size-3.5" aria-hidden="true" />
        ) : (
          <Play className="size-3.5" aria-hidden="true" />
        )}
        {isPlaying ? copy.pause : copy.play}
      </button>

      <span dir="ltr" className="text-xs tabular-nums text-white/45">
        {format(index + 1)} / {format(TOTAL_STAGES)}
      </span>
    </div>
  );
}
