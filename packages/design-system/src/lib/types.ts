export type FontScale = Record<
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16,
  number
>;

export type SizeKey = keyof FontScale;

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
  /** Font family on native. */
  family: string;
  /** Font family on web, usually a CSS font stack. Defaults to `family`. */
  webFamily?: string;
  /** Sizes that replace the default `ramp` at the given steps. Other steps keep the ramp value. */
  size?: Partial<FontScale>;
  /**
   * A function from font size to line height, applied to every step. Or line heights at given
   * steps: each one sets an offset from the default rule that carries to all larger steps.
   */
  lineHeight?: Partial<FontScale> | ((size: number) => number);
  /** Letter spacing from a step up to the next given step. Defaults to 0. */
  letterSpacing?: Partial<FontScale>;
  /** Weight from a step up to the next given step. Defaults to `"400"`. */
  weight?: Partial<Record<SizeKey, FontWeight>>;
  /** Native only. Maps a weight to a named font face, for fonts with one file per weight. */
  face?: Partial<Record<FontWeight, string>>;
};

export type Mode = "light" | "dark";

export type RampStep =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

export type TransparentStep = "100" | "200" | "300" | "400" | "500" | "600";

/** The names `S` for which `C` has a full solid ramp (`S-50`…`S-950`) and transparent ramp. */
export type StatusName<C> = {
  [K in keyof C & string]: K extends `${infer S}-transparent-100`
    ? `${S}-${RampStep}` | `${S}-transparent-${TransparentStep}` extends keyof C
      ? S
      : never
    : never;
}[keyof C & string];

export type TintSteps = {
  default: RampStep;
  hover: RampStep;
  active: RampStep;
  focusBorder: RampStep;
  transparentBorder: RampStep;
};

export type InkSteps = {
  default: RampStep;
  hover: RampStep;
  active: RampStep;
  disabled: RampStep;
};

export type BorderSteps = Record<1 | 2 | 3 | 4 | 5, RampStep>;
