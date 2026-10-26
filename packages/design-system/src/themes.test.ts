import { describe, expect, it, vi } from "vitest";
import { colors } from "./colors";
import {
  borderSteps,
  createTheme,
  darkTheme,
  inkSteps,
  lightTheme,
  statusBorders,
  statusInk,
  statusTints,
  tintSteps,
  type Theme,
} from "./index";

vi.mock("react-native", () => ({ Platform: { OS: "ios" } }));

function leaves(value: object, prefix = ""): [string, unknown][] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === "object" && child !== null
      ? leaves(child, `${prefix}${key}.`)
      : [[`${prefix}${key}`, child] as [string, unknown]],
  );
}

describe.each([
  ["light", lightTheme],
  ["dark", darkTheme],
] as [string, Theme][])("%s theme", (_, theme) => {
  it("resolves every semantic color to a palette value", () => {
    const palette = new Set(Object.values(theme.colors));
    const semantic = leaves({ tints: theme.tints, surfaces: theme.surfaces, ink: theme.ink });
    for (const [path, value] of semantic) {
      expect(palette.has(value as string), path).toBe(true);
    }
  });
});

describe("light and dark themes", () => {
  it("have the same keys", () => {
    const keys = (theme: Theme) => leaves(theme).map(([path]) => path);
    expect(keys(darkTheme)).toEqual(keys(lightTheme));
  });

  it("run the basic surfaces from the darkest level in dark mode", () => {
    const levels = (theme: Theme) =>
      ([1, 2, 3, 4] as const).map((level) => theme.surfaces.background[`basic-${level}`]);
    expect(levels(lightTheme)).toEqual([
      colors["basic-100"],
      colors["basic-200"],
      colors["basic-300"],
      colors["basic-400"],
    ]);
    expect(levels(darkTheme)).toEqual([
      colors["basic-950"],
      colors["basic-800"],
      colors["basic-700"],
      colors["basic-600"],
    ]);
  });

  it("use light ink on dark backgrounds", () => {
    expect(lightTheme.ink.basic).toBe(colors["basic-700"]);
    expect(darkTheme.ink.basic).toBe(colors["basic-50"]);
  });

  it("share the palette", () => {
    expect(darkTheme.colors).toEqual(lightTheme.colors);
  });
});

describe("createTheme", () => {
  it("derives tints, surfaces, and ink from the given palette", () => {
    const brand = { "primary-300": "#300000", "primary-400": "#400000", "primary-500": "#500000" };
    const light = createTheme("light", { colors: brand });
    const dark = createTheme("dark", { colors: brand });

    expect(light.colors["primary-500"]).toBe("#500000");
    expect(light.colors["accent-500"]).toBe(colors["accent-500"]);
    expect(light.tints.primary.default).toBe("#500000");
    expect(light.tints.primary.hover).toBe("#400000");
    expect(light.ink.primary).toBe("#500000");
    expect(light.surfaces.border["primary-1"]).toBe("#500000");

    expect(dark.tints.primary.default).toBe("#400000");
    expect(dark.tints.primary.hover).toBe("#300000");
    expect(dark.ink.primary).toBe("#300000");
  });

  it("merges ramp step overrides over the mode presets", () => {
    const theme = createTheme("light", {
      tints: { default: "600" },
      ink: { default: "700" },
      surfaces: { 1: "400" },
    });

    expect(theme.tints.danger.default).toBe(colors["danger-600"]);
    expect(theme.tints.danger.hover).toBe(colors["danger-400"]);
    expect(theme.ink.danger).toBe(colors["danger-700"]);
    expect(theme.ink["danger-hover"]).toBe(colors["danger-400"]);
    expect(theme.surfaces.border["danger-1"]).toBe(colors["danger-400"]);
    expect(theme.surfaces.border["danger-2"]).toBe(colors["danger-600"]);
    expect(theme.tints.basic).toEqual(lightTheme.tints.basic);
  });
});

describe("status helpers", () => {
  const muted = {
    "muted-50": "#m50",
    "muted-100": "#m100",
    "muted-200": "#m200",
    "muted-300": "#m300",
    "muted-400": "#m400",
    "muted-500": "#m500",
    "muted-600": "#m600",
    "muted-700": "#m700",
    "muted-800": "#m800",
    "muted-900": "#m900",
    "muted-950": "#m950",
    "muted-transparent-100": "#mt100",
    "muted-transparent-200": "#mt200",
    "muted-transparent-300": "#mt300",
    "muted-transparent-400": "#mt400",
    "muted-transparent-500": "#mt500",
    "muted-transparent-600": "#mt600",
  };
  const theme = { ...lightTheme, colors: { ...lightTheme.colors, ...muted } };

  it("build the tints of a status that the consumer adds", () => {
    const tint = statusTints(theme, "muted", tintSteps.light);
    expect(Object.keys(tint)).toEqual(Object.keys(lightTheme.tints.primary));
    expect(tint.default).toBe("#m500");
    expect(tint["border-focus"]).toBe("#m700");
    expect(tint["transparent-hover"]).toBe("#mt200");
    expect(tint.disabled).toBe(colors["basic-transparent-300"]);
  });

  it("build the ink of a status that the consumer adds", () => {
    expect(statusInk(theme, "muted", inkSteps.dark)).toEqual({
      muted: "#m300",
      "muted-focus": "#m400",
      "muted-hover": "#m200",
      "muted-active": "#m400",
      "muted-disabled": "#m600",
    });
  });

  it("build the surface borders of a status that the consumer adds", () => {
    expect(statusBorders(theme, "muted", borderSteps)).toEqual({
      "muted-1": "#m500",
      "muted-2": "#m600",
      "muted-3": "#m700",
      "muted-4": "#m800",
      "muted-5": "#m900",
    });
  });

  it("accept only statuses with a full ramp in the palette", () => {
    // @ts-expect-error: the default palette has no muted ramp.
    statusTints(lightTheme, "muted", tintSteps.light);
    statusBorders(lightTheme, "basic", borderSteps);
  });
});
