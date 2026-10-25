import { colors } from "./colors";
import { darkInk, lightInk } from "./ink";
import { radius, size, space } from "./scales";
import { fontSizes } from "./typography";
import { darkShadows, lightShadows } from "./shadows";
import { darkSurfaces, lightSurfaces } from "./surfaces";
import { tints } from "./tints";

export const lightTheme = {
  colors,
  tints,
  surfaces: lightSurfaces,
  ink: lightInk,
  shadows: lightShadows,
  space,
  size,
  radius,
  fonts: { size: fontSizes },
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
  fonts: { size: fontSizes },
};
