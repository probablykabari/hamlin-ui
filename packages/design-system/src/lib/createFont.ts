import { Platform } from "react-native";
import { lineHeight } from "./lineHeight";
import { ramp } from "./ramp";
import type { Font, FontInput, FontScale, FontWeight, SizeKey } from "./types";

const sizeKeys = Array.from({ length: 16 }, (_, i) => (i + 1) as SizeKey);

const fontWeights: FontWeight[] = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];

const forwardFill = <T>(table: Partial<Record<SizeKey, T>> = {}, first: T): Record<SizeKey, T> => {
  const out = {} as Record<SizeKey, T>;
  let value = first;
  for (const key of sizeKeys) {
    value = table[key] ?? value;
    out[key] = value;
  }
  return out;
};

/**
 * Builds a theme font for the current platform. It reads `Platform.OS`, so the result differs
 * on native and web. Sizes start from `ramp(13)` on native and `ramp(11)` on web, so one
 * step reads at a similar physical size on each platform.
 *
 * @example
 * createFont({
 *   family: "Inter",
 *   webFamily: "Inter, system-ui, sans-serif",
 *   weight: { 1: "400", 6: "700" },
 *   face: { "400": "Inter-Regular", "700": "Inter-Bold" },
 * });
 */
export const createFont = (input: FontInput): Font => {
  const platform = Platform.OS === "web" ? "web" : "native";
  const family = platform === "web" ? (input.webFamily ?? input.family) : input.family;
  const rampBase = platform === "web" ? 11 : 13;
  const size = { ...ramp(rampBase), ...input.size };

  const rule =
    typeof input.lineHeight === "function"
      ? input.lineHeight
      : (fontSize: number) => lineHeight(fontSize, platform);
  const lineHeightOverrides =
    typeof input.lineHeight === "function" ? {} : (input.lineHeight ?? {});
  // An override sets an offset from the rule that carries up to the larger sizes,
  // so a large size never falls back to a smaller size's line height.
  const lineHeights = {} as FontScale;
  let offset = 0;
  for (const key of sizeKeys) {
    const base = rule(size[key]);
    const override = lineHeightOverrides[key];
    if (override !== undefined) offset = override - base;
    lineHeights[key] = base + offset;
  }

  // On web the browser picks the weight from fontWeight; named faces are native-only.
  const face = {} as Record<FontWeight, string>;
  for (const weight of fontWeights) {
    face[weight] = (platform === "native" && input.face?.[weight]) || family;
  }

  return {
    family,
    size,
    lineHeight: lineHeights,
    letterSpacing: forwardFill(input.letterSpacing, 0),
    weight: forwardFill<FontWeight>(input.weight, "400"),
    face,
  };
};
