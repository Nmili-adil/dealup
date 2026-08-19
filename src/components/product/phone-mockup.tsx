import React from "react";
import { cn } from "@/lib/utils/cn";

interface PhoneMockupProps {
  className?: string;
  children?: React.ReactNode;
  showStatusBar?: boolean;
  showHomeIndicator?: boolean;
}

export function PhoneMockup({
  className,
  children,
  showStatusBar = true,
  showHomeIndicator = true,
}: PhoneMockupProps) {
  return (
    <div className={cn("relative mx-auto inline-block select-none", className)}>
      {/* ================= PHYSICAL BUTTONS ================= */}
      {/* Left side: Action Button */}
      <div className="absolute -left-[3px] top-[115px] h-6 w-[3px] rounded-l-sm bg-neutral-600 shadow-sm" />
      {/* Left side: Volume Up */}
      <div className="absolute -left-[3px] top-[155px] h-12 w-[3px] rounded-l-sm bg-neutral-600 shadow-sm" />
      {/* Left side: Volume Down */}
      <div className="absolute -left-[3px] top-[215px] h-12 w-[3px] rounded-l-sm bg-neutral-600 shadow-sm" />

      {/* Right side: Power / Side Button */}
      <div className="absolute -right-[3px] top-[140px] h-16 w-[3px] rounded-r-sm bg-neutral-600 shadow-sm" />
      {/* Right side: iPhone 16 Camera Control Button */}
      <div className="absolute -right-[3px] top-[280px] h-14 w-[3px] rounded-r-sm bg-neutral-500/80 shadow-sm" />

      {/* ================= OUTER TITANIUM CHASSIS ================= */}
      <div
        className={cn(
          "relative w-[340px] rounded-[52px] p-[10px]",
          // Brushed Titanium frame styling + realistic outer bevel & drop shadow
          "bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900",
          "ring-1 ring-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.8)]"
        )}
      >
        {/* ================= ULTRA-THIN SCREEN BEZEL ================= */}
        <div className="relative overflow-hidden rounded-[43px] bg-black ring-1 ring-black">
          
          {/* ================= STATUS BAR & DYNAMIC ISLAND ================= */}
          {showStatusBar && (
            <div className="absolute inset-x-0 top-0 z-30 flex h-11 items-center justify-between px-7 pt-1 text-white">
              {/* Status Time */}
              <span className="text-[13px] font-semibold tracking-tight text-white/90">
                9:41
              </span>

              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-2.5 -translate-x-1/2">
                <div className="relative flex h-[26px] w-[88px] items-center justify-end rounded-full bg-black px-2 shadow-sm transition-all">
                  {/* Camera lens reflection dot */}
                  <div className="h-2.5 w-2.5 rounded-full bg-neutral-900 ring-1 ring-neutral-800 flex items-center justify-center">
                    <div className="h-1 w-1 rounded-full bg-[#1a233a]" />
                  </div>
                </div>
              </div>

              {/* Status Icons (Signal, Wifi, Battery) */}
              <div className="flex items-center gap-1.5 text-white/90">
                {/* Cellular Signal */}
                <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                  <path d="M2 20h2v-4H2v4zm4 0h2v-8H6v8zm4 0h2V8h-2v12zm4 0h2V4h-2v16z" />
                </svg>

                {/* Wi-Fi */}
                <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.5 0 6.69 1.41 9 3.69L12 19.31 3 11.19c2.31-2.28 5.5-3.69 9-3.69z" />
                </svg>

                {/* Battery */}
                <div className="flex items-center">
                  <div className="flex h-3 w-5 items-center rounded-[3px] border border-white/80 p-0.5">
                    <div className="h-full w-full rounded-[1px] bg-white" />
                  </div>
                  <div className="h-1 w-[1px] rounded-r-sm bg-white/80" />
                </div>
              </div>
            </div>
          )}

          {/* ================= SCREEN CONTENT ================= */}
          <div className="relative min-h-[690px] w-full overflow-y-auto bg-neutral-950 pt-11 text-neutral-100">
            {children}
          </div>

          {/* ================= SCREEN GLARE / GLASS SHINE OVERLAY ================= */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]" />

          {/* ================= HOME INDICATOR BAR ================= */}
          {showHomeIndicator && (
            <div className="pointer-events-none absolute inset-x-0 bottom-2 z-30 flex justify-center">
              <div className="h-1 w-32 rounded-full bg-white/50 backdrop-blur-md" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}