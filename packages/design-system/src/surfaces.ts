import type { Colors } from "./colors";
import type { BorderSteps, Mode, StatusName } from "./lib/types";

export const borderSteps: BorderSteps = { 1: "500", 2: "600", 3: "700", 4: "800", 5: "900" };

export function statusBorders<C extends Record<string, string>, S extends StatusName<C>>(
  theme: { colors: C },
  status: S,
  steps: BorderSteps,
) {
  const colors: Record<string, string> = theme.colors;
  return {
    [`${status}-1`]: colors[`${status}-${steps[1]}`],
    [`${status}-2`]: colors[`${status}-${steps[2]}`],
    [`${status}-3`]: colors[`${status}-${steps[3]}`],
    [`${status}-4`]: colors[`${status}-${steps[4]}`],
    [`${status}-5`]: colors[`${status}-${steps[5]}`],
  } as Record<`${S}-${keyof BorderSteps}`, string>;
}

export function createSurfaces(theme: { colors: Colors }, mode: Mode, steps: BorderSteps) {
  const { colors } = theme;
  const light = mode === "light";
  return {
    background: light
      ? {
          "basic-1": colors["basic-100"],
          "basic-2": colors["basic-200"],
          "basic-3": colors["basic-300"],
          "basic-4": colors["basic-400"],
          "alternative-1": colors["basic-700"],
          "alternative-2": colors["basic-800"],
          "alternative-3": colors["basic-900"],
          "alternative-4": colors["basic-950"],
        }
      : {
          "basic-1": colors["basic-950"],
          "basic-2": colors["basic-800"],
          "basic-3": colors["basic-700"],
          "basic-4": colors["basic-600"],
          "alternative-1": colors["basic-100"],
          "alternative-2": colors["basic-200"],
          "alternative-3": colors["basic-300"],
          "alternative-4": colors["basic-400"],
        },
    border: {
      ...(light
        ? {
            "basic-1": colors["basic-200"],
            "basic-2": colors["basic-300"],
            "basic-3": colors["basic-400"],
            "basic-4": colors["basic-500"],
            "basic-5": colors["basic-600"],
            "alternative-1": colors["basic-600"],
            "alternative-2": colors["basic-700"],
            "alternative-3": colors["basic-800"],
            "alternative-4": colors["basic-900"],
            "alternative-5": colors["basic-950"],
          }
        : {
            "basic-1": colors["basic-900"],
            "basic-2": colors["basic-700"],
            "basic-3": colors["basic-600"],
            "basic-4": colors["basic-500"],
            "basic-5": colors["basic-400"],
            "alternative-1": colors["basic-50"],
            "alternative-2": colors["basic-100"],
            "alternative-3": colors["basic-200"],
            "alternative-4": colors["basic-300"],
            "alternative-5": colors["basic-400"],
          }),
      ...statusBorders(theme, "primary", steps),
      ...statusBorders(theme, "accent", steps),
      ...statusBorders(theme, "success", steps),
      ...statusBorders(theme, "info", steps),
      ...statusBorders(theme, "warning", steps),
      ...statusBorders(theme, "danger", steps),
    },
  };
}

export type Surfaces = ReturnType<typeof createSurfaces>;
