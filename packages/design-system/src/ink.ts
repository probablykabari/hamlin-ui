import type { Colors } from "./colors";
import type { InkSteps, Mode, StatusName } from "./lib/types";

export const inkSteps: Record<Mode, InkSteps> = {
  light: { default: "500", hover: "400", active: "600", disabled: "400" },
  // Status 500 is about 1.6:1 on the basic-700 dark page, so dark ink runs two steps lighter.
  dark: { default: "300", hover: "200", active: "400", disabled: "600" },
};

type StatusInk<S extends string> = Record<
  S | `${S}-focus` | `${S}-hover` | `${S}-active` | `${S}-disabled`,
  string
>;

export function statusInk<C extends Record<string, string>, S extends StatusName<C>>(
  theme: { colors: C },
  status: S,
  steps: InkSteps,
) {
  const colors: Record<string, string> = theme.colors;
  return {
    [status]: colors[`${status}-${steps.default}`],
    [`${status}-focus`]: colors[`${status}-${steps.active}`],
    [`${status}-hover`]: colors[`${status}-${steps.hover}`],
    [`${status}-active`]: colors[`${status}-${steps.active}`],
    [`${status}-disabled`]: colors[`${status}-${steps.disabled}`],
  } as StatusInk<S>;
}

export function createInk(theme: { colors: Colors }, mode: Mode, steps: InkSteps) {
  const { colors } = theme;
  return {
    basic: mode === "light" ? colors["basic-700"] : colors["basic-50"],
    alternate: mode === "light" ? colors["basic-50"] : colors["basic-800"],
    disabled: colors["basic-transparent-600"],
    hint: colors["basic-500"],
    ...statusInk(theme, "primary", steps),
    ...statusInk(theme, "accent", steps),
    ...statusInk(theme, "success", steps),
    ...statusInk(theme, "info", steps),
    ...statusInk(theme, "warning", steps),
    ...statusInk(theme, "danger", steps),
  };
}

export type Ink = ReturnType<typeof createInk>;
