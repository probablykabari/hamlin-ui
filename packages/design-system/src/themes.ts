import { colors } from "./colors";
import { darkInk, lightInk } from "./ink";
import { radius, size, space } from "./scales";
import { darkShadows, lightShadows } from "./shadows";
import { darkSurfaces, lightSurfaces } from "./surfaces";
import { tints } from "./tints";
import { createFont } from "./typography";

const systemStack =
  '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const fonts = {
  body: createFont({ family: "System", webFamily: systemStack }),
  heading: createFont({ family: "System", webFamily: systemStack, weight: { 1: "700" } }),
};

export const lightTheme = {
  colors,
  tints,
  surfaces: lightSurfaces,
  ink: lightInk,
  shadows: lightShadows,
  space,
  size,
  radius,
  fonts,
};

export type Theme = typeof lightTheme;

export const darkTheme: Theme = {
  colors,
  tints,
  surfaces: darkSurfaces,
  ink: darkInk,
  shadows: darkShadows,
  space,
  size,
  radius,
  fonts,
};
