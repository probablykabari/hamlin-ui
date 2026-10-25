import { Platform } from "react-native";

export type FontScale = Record<
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16,
  number
>;

type SizeKey = keyof FontScale;

export type FontWeight = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

export type Font = {
  family: string;
  size: FontScale;
  lineHeight: FontScale;
  letterSpacing: FontScale;
  weight: Record<SizeKey, FontWeight>;
  face: Record<FontWeight, string>;
};

export type FontInput = {
  family: string;
  webFamily?: string;
  size?: Partial<FontScale>;
  lineHeight?: Partial<FontScale> | ((size: number) => number);
  letterSpacing?: Partial<FontScale>;
  weight?: Partial<Record<SizeKey, FontWeight>>;
  face?: Partial<Record<FontWeight, string>>;
};

const sizeKeys = Array.from({ length: 16 }, (_, i) => (i + 1) as SizeKey);

const fontWeights: FontWeight[] = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];

// Each step grows 8% at UI sizes, easing up to 19% at display sizes: small text
// wants about a point between steps, large text wants a proportion.
export const ramp = (start: number): FontScale => {
  const out: Record<number, number> = {};
  let px = start;
  for (let i = 1; i <= 16; i++) {
    out[i] = Math.round(px);
    px *= Math.min(1.19, 1.05 + i * 0.019);
  }
  return out as FontScale;
};

// Native runs tighter because its text box has no half leading above the cap line.
export const lineHeight = (size: number, platform: "native" | "web"): number =>
  platform === "native" ? Math.round(size * 1.2 + 4) : Math.round(size * 1.35 + 3);

const forwardFill = <T>(table: Partial<Record<SizeKey, T>> = {}, first: T): Record<SizeKey, T> => {
  const out = {} as Record<SizeKey, T>;
  let value = first;
  for (const key of sizeKeys) {
    value = table[key] ?? value;
    out[key] = value;
  }
  return out;
};

export const createFont = (input: FontInput): Font => {
  const platform = Platform.OS === "web" ? "web" : "native";
  const family = platform === "web" ? (input.webFamily ?? input.family) : input.family;
  const size = { ...ramp(11), ...input.size };

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
