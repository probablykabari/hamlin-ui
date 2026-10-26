import { StyleSheet } from "react-native-unistyles";
import type { Theme } from "../themes";

type Kind = "basic" | "alternative";
type Level = 1 | 2 | 3 | 4;

const tone = (theme: Theme, kind: Kind, level: Level) => ({
  backgroundColor: theme.surfaces.background[`${kind}-${level}`],
  borderColor: theme.surfaces.border[`${kind}-${level}`],
});

const bordered = { true: { borderWidth: 1 } };

// The callback MUST return an object literal: the Unistyles transform skips a block body.
export const surfaces = StyleSheet.create((theme: Theme) => ({
  base: {
    variants: {
      level: {
        1: tone(theme, "basic", 1),
        2: tone(theme, "basic", 2),
        3: tone(theme, "basic", 3),
        4: tone(theme, "basic", 4),
      },
      bordered,
    },
  },
  alt: {
    variants: {
      level: {
        1: tone(theme, "alternative", 1),
        2: tone(theme, "alternative", 2),
        3: tone(theme, "alternative", 3),
        4: tone(theme, "alternative", 4),
      },
      bordered,
    },
  },
  lift: {
    boxShadow: `0 1px 2px ${theme.shadows["shadow-2"]}, 0 4px 12px ${theme.shadows["shadow-3"]}`,
  },
}));
