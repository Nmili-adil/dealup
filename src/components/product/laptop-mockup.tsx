import React from "react";
import { cn } from "@/lib/utils/cn";

interface LaptopMockupProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * A laptop rendered in CSS, the desk-side counterpart to `PhoneMockup`.
 *
 * Fully fluid: the frame is sized by its parent and every part of the shell is
 * expressed as a percentage or in `em`, so the bezel, hinge and radii stay in
 * proportion at any width. The screen is a container, letting the interface
 * inside scale with the device rather than against it.
 */
export function LaptopMockup({ className, children }: LaptopMockupProps) {
  return (
    <div className={cn("relative select-none", className)}>
      {/* ================= LID ================= */}
      <div
        className="relative bg-linear-to-b from-neutral-700 via-neutral-800 to-neutral-900 p-[1.5%] pb-[2.1%] shadow-[0_28px_60px_-20px_rgba(6,64,47,0.5)] ring-1 ring-white/15"
        style={{ borderRadius: "2.4% / 3.6%" }}
      >
        {/* Camera dot */}
        <div className="absolute inset-x-0 top-[0.5%] flex justify-center" aria-hidden="true">
          <span className="size-[0.7%] min-h-[3px] min-w-[3px] rounded-full bg-neutral-950 ring-1 ring-neutral-600/50" />
        </div>

        {/* ================= SCREEN ================= */}
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-[3px] bg-white ring-1 ring-black/60 @container">
          {children}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/[0.04] to-white/[0.09]"
          />
        </div>
      </div>

      {/* ================= HINGE + BASE ================= */}
      <div aria-hidden="true" className="relative">
        <div className="mx-auto h-[1.9%] min-h-[6px] w-[104%] rounded-b-[6px] bg-linear-to-b from-neutral-600 via-neutral-700 to-neutral-800 shadow-[0_10px_20px_-8px_rgba(11,18,32,0.5)]" />
        <div className="mx-auto -mt-[1.9%] h-[1.9%] min-h-[6px] w-[13%] rounded-b-[4px] bg-neutral-900/70" />
        <div className="mx-auto mt-[1%] h-[2%] min-h-[8px] w-[86%] rounded-[50%] bg-brand-dark/20 blur-lg" />
      </div>
    </div>
  );
}
