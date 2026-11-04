"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  BarChart3,
  Check,
  ChevronRight,
  Inbox,
  LayoutDashboard,
  Megaphone,
  Search,
  SlidersHorizontal,
  Workflow,
} from "lucide-react";
import { FLOW_EASE } from "../flow-stages";
import { cn } from "@/lib/utils/cn";

/** Shared entrance for anything appearing inside a laptop screen. */
export function Rise({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: FLOW_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * The app shell every chapter renders inside: a rail, a header and a content
 * area. Keeping it mounted across chapters is what makes the five screens read
 * as one product rather than five separate mockups.
 */
export function ScreenFrame({
  title,
  active,
  trailing,
  children,
}: {
  title: string;
  /** Which rail item this chapter lights up. */
  active: number;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  const railIcons = [LayoutDashboard, Megaphone, Inbox, Workflow, BarChart3];

  return (
    <div
      // One root size in container units; everything inside is em-relative, so
      // the whole interface scales with the laptop instead of being squashed.
      style={{ fontSize: "clamp(4.5px, 1.45cqw, 11px)" }}
      className="flex h-full bg-[#fafcfa] text-text-primary"
    >
      {/* Left rail */}
      <div className="flex w-[3.4em] shrink-0 flex-col items-center gap-[0.7em] border-e border-black/6 bg-brand-dark py-[1em]">
        <span className="grid size-[1.9em] shrink-0 place-items-center overflow-hidden rounded-[0.45em] bg-white/95">
          <Image
            src="/assets/logos/dealup-mark.webp"
            alt=""
            width={752}
            height={502}
            className="w-[82%] object-contain"
          />
        </span>
        <span className="h-px w-[1.6em] bg-white/15" />
        {railIcons.map((Icon, i) => (
          <span
            key={i}
            className={cn(
              "grid size-[1.9em] place-items-center rounded-[0.45em] transition-colors",
              i === active ? "bg-white/15 text-[#8ef0b5]" : "text-white/35"
            )}
          >
            <Icon className="size-[1.1em]" strokeWidth={2} />
          </span>
        ))}
        <span className="mt-auto size-[1.5em] rounded-full bg-white/12" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-black/6 px-[1.4em] py-[0.85em]">
          {/* Brand first, then the panel — breadcrumbs read outermost-first. */}
          <span className="flex items-center gap-[0.55em]">
            <Image
              src="/assets/logos/dealup-wordmark.webp"
              alt=""
              width={799}
              height={254}
              className="h-[0.95em] w-auto object-contain"
            />
            <ChevronRight className="size-[0.75em] shrink-0 text-text-secondary rtl:rotate-180" />
            <span className="text-[0.85em] font-semibold tracking-tight">{title}</span>
          </span>
          <span className="flex items-center gap-[0.6em]">
            {trailing}
            <span className="size-[1.4em] rounded-full bg-brand/15" />
          </span>
        </div>
        <div className="min-h-0 flex-1 p-[1.3em]">{children}</div>
      </div>
    </div>
  );
}

/** Search + filter row, the strip every real dashboard view carries. */
export function Toolbar({
  search,
  chips,
  trailing,
}: {
  search: string;
  chips: string[];
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-[0.5em]">
      <span className="flex min-w-0 flex-1 items-center gap-[0.4em] rounded-[0.4em] border border-black/8 bg-white px-[0.6em] py-[0.35em]">
        <Search className="size-[0.75em] shrink-0 text-text-secondary" />
        <span className="truncate text-[0.65em] text-text-secondary">{search}</span>
      </span>
      {chips.map((chip, i) => (
        <span
          key={chip}
          className={cn(
            "shrink-0 rounded-[0.4em] px-[0.55em] py-[0.3em] text-[0.62em] font-medium",
            i === 0 ? "bg-brand-dark text-white" : "border border-black/8 bg-white text-text-secondary"
          )}
        >
          {chip}
        </span>
      ))}
      <span className="flex shrink-0 items-center gap-[0.25em]">
        <SlidersHorizontal className="size-[0.8em] text-text-secondary" />
      </span>
      {trailing}
    </div>
  );
}

export function Chip({
  tone = "neutral",
  className,
  children,
}: {
  tone?: "neutral" | "mint" | "amber";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[0.7em] font-semibold",
        tone === "mint" && "bg-surface-mint text-brand-hover",
        tone === "amber" && "bg-accent-soft text-accent-strong",
        tone === "neutral" && "bg-black/5 text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}

export function CheckRow({ label, delay }: { label: string; delay: number }) {
  return (
    <Rise delay={delay} className="flex items-center gap-1.5 text-[0.8em] text-text-primary">
      <span className="grid size-3 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-hover">
        <Check className="size-2" strokeWidth={3} />
      </span>
      {label}
    </Rise>
  );
}

/** A labelled figure, used across the campaign and analytics screens. */
export function Stat({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-black/6 bg-white px-2 py-1.5", className)}>
      <p className="text-[0.7em] text-text-secondary">{label}</p>
      <p className="mt-0.5 text-[1.1em] font-semibold tracking-tight text-text-primary">{children}</p>
    </div>
  );
}
