import { StyleSheet } from "react-native-unistyles";
import type { Theme } from "../themes";

type StackProps = { gap?: keyof Theme["space"] };

export const stack = StyleSheet.create((theme: Theme) => ({
  xstack: ({ gap = 0 }: StackProps = {}) => ({
    flexDirection: "row",
    flexWrap: "wrap",
    // The default "stretch" grows every child to the tallest item in its line.
    alignItems: "center",
    gap: theme.space[gap],
  }),
  ystack: ({ gap = 0 }: StackProps = {}) => ({
    flexDirection: "column",
    gap: theme.space[gap],
  }),
}));
