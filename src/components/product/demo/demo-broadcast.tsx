"use client";

import { useCallback } from "react";
import { Check, CheckCheck, FileSpreadsheet, Send, Upload, Users, X } from "lucide-react";
import { DemoStage, type DemoScript } from "./demo-stage";
import { DemoCursor } from "./demo-cursor";
import { cn } from "@/lib/utils/cn";

const avatars = ["S", "Y", "I", "K"];

const files = [
  { name: "contacts-ramadan.csv", size: "38 KB" },
  { name: "clients-2026.xlsx", size: "112 KB" },
];

/** Rows that stream in while the file is being read. */
const incoming = [
  { initial: "S", name: "Sara Bennani", phone: "6 12 ** ** 40" },
  { initial: "Y", name: "Yassine Kadiri", phone: "6 61 ** ** 18" },
  { initial: "I", name: "Imane Rachidi", phone: "6 70 ** ** 92" },
];

/**
 * Step 0 idle · 1 file dialog open · 2 file selected · 3 importing, rows
 * streaming in · 4 imported · 5 sending · 6 sent.
 */
export function DemoBroadcast({ label, playing }: { label: string; playing: boolean }) {
  const script: DemoScript = useCallback(async ({ moveTo, click, setStep, wait, isLive }) => {
    // Open the file picker.
    await moveTo(76, 14, 0.8);
    if (!isLive()) return;
    await click();
    setStep(1);
    await wait(0.55);
    if (!isLive()) return;

    // Choose the file.
    await moveTo(46, 45, 0.6);
    if (!isLive()) return;
    await click();
    setStep(2);
    await wait(0.45);
    if (!isLive()) return;

    // Confirm the import and watch the rows arrive.
    await moveTo(74, 72, 0.55);
    if (!isLive()) return;
    await click();
    setStep(3);
    await wait(1.5);
    if (!isLive()) return;

    setStep(4);
    await wait(0.7);
    if (!isLive()) return;

    // Send the broadcast.
    await moveTo(84, 86, 0.75);
    if (!isLive()) return;
    await click();
    setStep(5);
    await wait(1.15);
    if (!isLive()) return;

    setStep(6);
    await wait(1.3);
  }, []);

  return (
    <DemoStage label={label} script={script} restStep={6} playing={playing}>
      {(step) => {
        // The picker is open from the click on Import until the read finishes.
        const showDialog = step >= 1 && step <= 3;
        const imported = step >= 4;

        return (
          <div className="relative flex h-full flex-col text-[8px] leading-tight">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-2 border-b border-border/70 px-2 py-1.5">
              <span className="flex items-center gap-1">
                <span className="font-semibold text-text-primary">Ramadan promo</span>
                <span
                  className={cn(
                    "rounded px-1 py-0.5 transition-colors duration-300",
                    step >= 6
                      ? "bg-surface-mint text-brand-hover"
                      : "bg-accent-soft text-accent-strong"
                  )}
                >
                  {step >= 6 ? "Sent" : "Draft"}
                </span>
              </span>
              <span
                className={cn(
                  "flex items-center gap-1 rounded-md border px-1.5 py-0.5 transition-colors duration-200",
                  step >= 1 ? "border-brand/50 bg-surface-mint" : "border-border/70 bg-white"
                )}
              >
                <Upload className="size-2 text-brand-hover" />
                <span className="text-text-primary">Import</span>
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-2">
              {/* Audience */}
              <div className="flex items-center gap-1.5">
                <span className="flex -space-x-1">
                  {avatars.map((a) => (
                    <span
                      key={a}
                      className={cn(
                        "grid size-3.5 place-items-center rounded-full border border-white text-[6px] font-semibold transition-colors duration-300",
                        imported
                          ? "bg-brand/15 text-brand-hover"
                          : "bg-surface-mint text-text-secondary"
                      )}
                    >
                      {a}
                    </span>
                  ))}
                </span>
                <Users className="size-2 text-text-secondary" />
                <span dir="ltr" className="inline-block font-semibold tabular-nums text-text-primary">
                  {imported ? "1 240" : "0"}
                </span>
                <span className="text-text-secondary">contacts</span>
              </div>

              {/* Template preview */}
              <div className="flex-1 rounded-md bg-surface-mint/50 p-1.5">
                <span className="block max-w-[85%] rounded-lg rounded-ss-sm bg-white px-1.5 py-1 text-text-primary shadow-e1">
                  <span className="block font-semibold">Offre Ramadan 🌙</span>
                  <span className="mt-0.5 block text-text-secondary">
                    −20% sur tout le catalogue jusqu&apos;à dimanche.
                  </span>
                  <span className="mt-1 block rounded bg-surface-mint px-1 py-0.5 text-center text-brand-hover">
                    Voir le catalogue
                  </span>
                </span>
              </div>

              {/* Delivery */}
              <div className="flex flex-col gap-1">
                <div className="h-1 w-full overflow-hidden rounded-full bg-surface-mint">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-brand to-brand-hover transition-[width] duration-[1200ms] ease-out"
                    style={{ width: step >= 5 ? "100%" : "0%" }}
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "flex items-center gap-2 transition-opacity duration-300",
                      step >= 6 ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <span className="flex items-center gap-0.5 text-brand-hover">
                      <Check className="size-2" />
                      <span dir="ltr" className="inline-block tabular-nums">1 240 sent</span>
                    </span>
                    <span className="flex items-center gap-0.5 text-brand-hover">
                      <CheckCheck className="size-2" />
                      <span dir="ltr" className="inline-block tabular-nums">1 128 read</span>
                    </span>
                  </span>

                  <span
                    className={cn(
                      "flex shrink-0 items-center gap-1 rounded-md px-2 py-1 font-medium text-white transition-colors duration-200",
                      step >= 5 ? "bg-brand-hover" : "bg-brand"
                    )}
                  >
                    <Send className="size-2" />
                    {step >= 6 ? "Sent" : step >= 5 ? "Sending…" : "Send"}
                  </span>
                </div>
              </div>
            </div>

            {/* ---- File picker dialog ---- */}
            <div
              className={cn(
                "absolute inset-0 z-20 flex items-center justify-center bg-ink/25 p-2 transition-opacity duration-200",
                showDialog ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <div
                className={cn(
                  "flex w-[86%] origin-center flex-col gap-1.5 rounded-lg border border-border/70 bg-white p-2 shadow-e4 transition-transform duration-200",
                  showDialog ? "scale-100" : "scale-95"
                )}
              >
                <span className="flex items-center justify-between">
                  <span className="font-semibold text-text-primary">Import contacts</span>
                  <X className="size-2 text-text-secondary" />
                </span>

                {step < 3 ? (
                  <>
                    {files.map((file, index) => (
                      <span
                        key={file.name}
                        className={cn(
                          "flex items-center gap-1.5 rounded-md border px-1.5 py-1 transition-colors duration-200",
                          index === 0 && step >= 2
                            ? "border-brand/50 bg-surface-mint"
                            : "border-border/70 bg-white"
                        )}
                      >
                        <FileSpreadsheet className="size-2.5 shrink-0 text-brand-hover" />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-text-primary">{file.name}</span>
                          <span className="text-text-secondary">{file.size}</span>
                        </span>
                        {index === 0 && step >= 2 ? (
                          <Check className="size-2 shrink-0 text-brand-hover" />
                        ) : null}
                      </span>
                    ))}

                    <span className="mt-0.5 flex items-center justify-end gap-1">
                      <span className="rounded border border-border/70 px-1.5 py-0.5 text-text-secondary">
                        Cancel
                      </span>
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 font-medium text-white transition-colors duration-200",
                          step >= 2 ? "bg-brand" : "bg-brand/40"
                        )}
                      >
                        Import
                      </span>
                    </span>
                  </>
                ) : (
                  /* Reading the file: rows stream in, staggered. */
                  <>
                    <span className="flex items-center justify-between text-text-secondary">
                      <span className="truncate">{files[0].name}</span>
                      <span dir="ltr" className="inline-block shrink-0 tabular-nums text-brand-hover">
                        1 240 / 1 240
                      </span>
                    </span>

                    <span className="block h-1 w-full overflow-hidden rounded-full bg-surface-mint">
                      <span className="block h-full w-full origin-left animate-[demo-fill_1.4s_ease-out_forwards] rounded-full bg-linear-to-r from-brand to-brand-hover" />
                    </span>

                    <span className="flex flex-col gap-1">
                      {incoming.map((row, index) => (
                        <span
                          key={row.name}
                          className="flex animate-[demo-row-in_0.4s_ease-out_both] items-center gap-1.5 rounded-md border border-border/70 bg-white px-1.5 py-1"
                          style={{ animationDelay: `${0.25 + index * 0.3}s` }}
                        >
                          <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-brand/15 text-[6px] font-semibold text-brand-hover">
                            {row.initial}
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-text-primary">{row.name}</span>
                            <span dir="ltr" className="inline-block truncate text-text-secondary">
                              {row.phone}
                            </span>
                          </span>
                          <Check className="size-2 shrink-0 text-brand-hover" />
                        </span>
                      ))}
                    </span>
                  </>
                )}
              </div>
            </div>

            <DemoCursor />
          </div>
        );
      }}
    </DemoStage>
  );
}
