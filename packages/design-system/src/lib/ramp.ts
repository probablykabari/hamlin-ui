import type { FontScale } from "./types";

/**
 * Builds a 16-step font size scale from the size at step 1. Each step grows about 8% at UI
 * sizes, easing up to 19% at display sizes: small text wants about a point between steps,
 * large text wants a proportion. Values are rounded to whole pixels.
 *
 * @example ramp(13) // { 1: 13, 2: 14, 3: 15, 4: 17, 5: 19, ..., 16: 119 }
 */
export const ramp = (start: number): FontScale => {
  const out: Record<number, number> = {};
  let px = start;
  for (let i = 1; i <= 16; i++) {
    out[i] = Math.round(px);
    px *= Math.min(1.19, 1.05 + i * 0.019);
  }
  return out as FontScale;
};
