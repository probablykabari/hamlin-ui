import { breakpoints, darkTheme, lightTheme } from "hamlin-ui";
import { StyleSheet } from "react-native-unistyles";

const themes = { light: lightTheme, dark: darkTheme };

type AppThemes = typeof themes;
type AppBreakpoints = typeof breakpoints;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({ themes, breakpoints, settings: { initialTheme: "light" } });
