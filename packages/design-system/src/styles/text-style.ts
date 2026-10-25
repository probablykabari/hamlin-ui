import { StyleSheet } from "react-native-unistyles";
import type { Theme } from "../themes";

export const typography = StyleSheet.create((theme: Theme) => ({
  body: {
    fontFamily: theme.fonts.body.face[theme.fonts.body.weight[5]],
    fontSize: theme.fonts.body.size[5],
    lineHeight: theme.fonts.body.lineHeight[5],
    letterSpacing: theme.fonts.body.letterSpacing[5],
    fontWeight: theme.fonts.body.weight[5],
  },
  label: {
    fontFamily: theme.fonts.body.face["500"],
    fontSize: theme.fonts.body.size[3],
    lineHeight: theme.fonts.body.lineHeight[3],
    letterSpacing: theme.fonts.body.letterSpacing[3],
    fontWeight: "500",
  },
  caption: {
    fontFamily: theme.fonts.body.face[theme.fonts.body.weight[2]],
    fontSize: theme.fonts.body.size[2],
    lineHeight: theme.fonts.body.lineHeight[2],
    letterSpacing: theme.fonts.body.letterSpacing[2],
    fontWeight: theme.fonts.body.weight[2],
  },
  heading: {
    variants: {
      level: {
        1: {
          fontFamily: theme.fonts.heading.face[theme.fonts.heading.weight[11]],
          fontSize: theme.fonts.heading.size[11],
          lineHeight: theme.fonts.heading.lineHeight[11],
          letterSpacing: theme.fonts.heading.letterSpacing[11],
          fontWeight: theme.fonts.heading.weight[11],
        },
        2: {
          fontFamily: theme.fonts.heading.face[theme.fonts.heading.weight[10]],
          fontSize: theme.fonts.heading.size[10],
          lineHeight: theme.fonts.heading.lineHeight[10],
          letterSpacing: theme.fonts.heading.letterSpacing[10],
          fontWeight: theme.fonts.heading.weight[10],
        },
        3: {
          fontFamily: theme.fonts.heading.face[theme.fonts.heading.weight[9]],
          fontSize: theme.fonts.heading.size[9],
          lineHeight: theme.fonts.heading.lineHeight[9],
          letterSpacing: theme.fonts.heading.letterSpacing[9],
          fontWeight: theme.fonts.heading.weight[9],
        },
        4: {
          fontFamily: theme.fonts.heading.face[theme.fonts.heading.weight[8]],
          fontSize: theme.fonts.heading.size[8],
          lineHeight: theme.fonts.heading.lineHeight[8],
          letterSpacing: theme.fonts.heading.letterSpacing[8],
          fontWeight: theme.fonts.heading.weight[8],
        },
        5: {
          fontFamily: theme.fonts.heading.face[theme.fonts.heading.weight[7]],
          fontSize: theme.fonts.heading.size[7],
          lineHeight: theme.fonts.heading.lineHeight[7],
          letterSpacing: theme.fonts.heading.letterSpacing[7],
          fontWeight: theme.fonts.heading.weight[7],
        },
        6: {
          fontFamily: theme.fonts.heading.face[theme.fonts.heading.weight[6]],
          fontSize: theme.fonts.heading.size[6],
          lineHeight: theme.fonts.heading.lineHeight[6],
          letterSpacing: theme.fonts.heading.letterSpacing[6],
          fontWeight: theme.fonts.heading.weight[6],
        },
      },
    },
  },
}));
