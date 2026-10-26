import type { Colors } from "./colors";
import type { Mode, StatusName, TintSteps } from "./lib/types";

export const tintSteps: Record<Mode, TintSteps> = {
  light: {
    default: "500",
    hover: "400",
    active: "600",
    focusBorder: "700",
    transparentBorder: "500",
  },
  // The dark page is basic-700, so every step moves lighter to stand out from it.
  dark: {
    default: "400",
    hover: "300",
    active: "500",
    focusBorder: "300",
    transparentBorder: "400",
  },
};

type TintPalette = Record<string, string> &
  Record<"basic-transparent-200" | "basic-transparent-300", string>;

export function statusTints<C extends TintPalette, S extends StatusName<C>>(
  theme: { colors: C },
  status: S,
  steps: TintSteps,
) {
  const colors: Record<string, string> = theme.colors;
  return {
    default: colors[`${status}-${steps.default}`],
    hover: colors[`${status}-${steps.hover}`],
    focus: colors[`${status}-${steps.active}`],
    active: colors[`${status}-${steps.active}`],
    disabled: colors["basic-transparent-300"],
    "border-default": colors[`${status}-${steps.default}`],
    "border-hover": colors[`${status}-${steps.hover}`],
    "border-focus": colors[`${status}-${steps.focusBorder}`],
    "border-active": colors[`${status}-${steps.active}`],
    "border-disabled": colors["basic-transparent-300"],
    "transparent-default": colors[`${status}-transparent-100`],
    "transparent-hover": colors[`${status}-transparent-200`],
    "transparent-focus": colors[`${status}-transparent-300`],
    "transparent-active": colors[`${status}-transparent-300`],
    "transparent-disabled": colors["basic-transparent-200"],
    "transparent-border-default": colors[`${status}-${steps.transparentBorder}`],
    "transparent-border-hover": colors[`${status}-${steps.transparentBorder}`],
    "transparent-border-focus": colors[`${status}-${steps.transparentBorder}`],
    "transparent-border-active": colors[`${status}-${steps.transparentBorder}`],
    "transparent-border-disabled": colors["basic-transparent-300"],
  };
}

const basicTintSteps: Record<Mode, TintSteps> = {
  light: {
    default: "200",
    hover: "100",
    active: "300",
    focusBorder: "400",
    transparentBorder: "500",
  },
  dark: {
    default: "600",
    hover: "500",
    active: "800",
    focusBorder: "400",
    transparentBorder: "400",
  },
};

export function createTints(theme: { colors: Colors }, mode: Mode, steps: TintSteps) {
  return {
    basic: statusTints(theme, "basic", basicTintSteps[mode]),
    primary: statusTints(theme, "primary", steps),
    accent: statusTints(theme, "accent", steps),
    success: statusTints(theme, "success", steps),
    info: statusTints(theme, "info", steps),
    warning: statusTints(theme, "warning", steps),
    danger: statusTints(theme, "danger", steps),
  };
}

export type Tints = ReturnType<typeof createTints>;
