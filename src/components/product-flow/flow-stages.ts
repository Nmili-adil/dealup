/**
 * Single source of truth for the product-flow timeline: which chapters exist,
 * how long each plays, and where the devices sit while it plays.
 *
 * Everything the sequence needs is here so no timing or transform is repeated
 * inside a component.
 */

export const STAGE_IDS = [
  "campaign",
  "reply",
  "automation",
  "handover",
  "analytics",
] as const;

export type StageId = (typeof STAGE_IDS)[number];

export interface FlowStage {
  id: StageId;
  /** Chapter number shown in the navigation. */
  number: string;
  /** Playback length in milliseconds. */
  duration: number;
}

export const FLOW_STAGES: readonly FlowStage[] = [
  { id: "campaign", number: "01", duration: 5500 },
  { id: "reply", number: "02", duration: 5000 },
  { id: "automation", number: "03", duration: 6000 },
  { id: "handover", number: "04", duration: 5500 },
  { id: "analytics", number: "05", duration: 6500 },
] as const;

export const TOTAL_STAGES = FLOW_STAGES.length;

/** Cinematic easing used for every major transition. */
export const FLOW_EASE = [0.22, 1, 0.36, 1] as const;

/** How the camera frames the two devices during each chapter. */
export interface StageCamera {
  laptopX: number;
  laptopScale: number;
  phoneX: number;
  phoneY: number;
  phoneScale: number;
  /** Ambient light drifts toward whichever device is carrying the story. */
  glowX: number;
}

export const STAGE_CAMERA: Record<StageId, StageCamera> = {
  campaign: { laptopX: 0, laptopScale: 1, phoneX: 0, phoneY: 0, phoneScale: 0.95, glowX: -10 },
  reply: { laptopX: -46, laptopScale: 0.96, phoneX: -22, phoneY: -10, phoneScale: 1.06, glowX: 30 },
  automation: { laptopX: -14, laptopScale: 1, phoneX: -6, phoneY: 0, phoneScale: 0.98, glowX: 0 },
  handover: { laptopX: 0, laptopScale: 1, phoneX: 6, phoneY: 6, phoneScale: 0.92, glowX: -14 },
  analytics: { laptopX: 0, laptopScale: 1.03, phoneX: 14, phoneY: 12, phoneScale: 0.84, glowX: -20 },
};

/**
 * Demo figures, kept in code rather than the dictionary so they stay
 * internally consistent and format per locale via Intl.
 *
 *   2 430 recipients · 2 401 delivered = 98.8%
 */
export const FLOW_DATA = {
  recipients: 2430,
  delivered: 2401,
  deliveryRate: 98.8,
  replies: 1842,
  confirmed: 87,
  conversionLift: 24,
  confidence: 96,
  orderNumber: "4521",
} as const;

/** Beats inside a chapter, as a fraction of that chapter's duration. */
export function beat(progress: number, at: number): boolean {
  return progress >= at;
}
