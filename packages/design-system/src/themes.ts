import { colors as defaultColors, type Colors } from "./colors";
import { createInk, inkSteps } from "./ink";
import { radius, size, space } from "./scales";
import { darkShadows, lightShadows } from "./shadows";
import { borderSteps, createSurfaces } from "./surfaces";
import { createTints, tintSteps } from "./tints";
import { createFont } from "./lib/createFont";
import type { BorderSteps, InkSteps, Mode, TintSteps } from "./lib/types";

const systemStack =
  '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const fonts = {
  body: createFont({ family: "System", webFamily: systemStack }),
  heading: createFont({
    family: "System",
    webFamily: systemStack,
    weight: { 1: "600", 10: "700" },
  }),
};

export type ThemeOptions = {
  /** Replaces keys of the default palette. */
  colors?: Partial<Colors>;
  /** Ramp steps of the status tints. Merged over `tintSteps[mode]`. */
  tints?: Partial<TintSteps>;
  /** Ramp steps of the status ink. Merged over `inkSteps[mode]`. */
  ink?: Partial<InkSteps>;
  /** Ramp steps of the status surface borders. Merged over `borderSteps`. */
  surfaces?: Partial<BorderSteps>;
};

export function createTheme(mode: Mode, options: ThemeOptions = {}) {
  const palette = { colors: { ...defaultColors, ...options.colors } };
  return {
    colors: palette.colors,
    tints: createTints(palette, mode, { ...tintSteps[mode], ...options.tints }),
    surfaces: createSurfaces(palette, mode, { ...borderSteps, ...options.surfaces }),
    ink: createInk(palette, mode, { ...inkSteps[mode], ...options.ink }),
    shadows: mode === "light" ? lightShadows : darkShadows,
    space,
    size,
    radius,
    fonts,
  };
}

export type Theme = ReturnType<typeof createTheme>;

export const lightTheme = createTheme("light");

export const darkTheme = createTheme("dark");
