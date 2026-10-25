import { describe, expect, it, vi } from "vitest";
import { colors } from "./colors";
import { darkTheme, lightTheme, type Theme } from "./index";

vi.mock("react-native", () => ({ Platform: { OS: "ios" } }));

function leaves(value: object, prefix = ""): [string, unknown][] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === "object" && child !== null
      ? leaves(child, `${prefix}${key}.`)
      : [[`${prefix}${key}`, child] as [string, unknown]],
  );
}

const palette = new Set(Object.values(colors));

describe.each([
  ["light", lightTheme],
  ["dark", darkTheme],
] as [string, Theme][])("%s theme", (_, theme) => {
  it("resolves every semantic color to a palette value", () => {
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

  it("invert the basic and alternative surfaces", () => {
    expect(lightTheme.surfaces.background["basic-1"]).toBe(darkTheme.surfaces.background["alternative-1"]);
    expect(darkTheme.surfaces.background["basic-1"]).toBe(lightTheme.surfaces.background["alternative-1"]);
    expect(lightTheme.surfaces.border["basic-1"]).toBe(darkTheme.surfaces.border["alternative-1"]);
  });

  it("use light ink on dark backgrounds", () => {
    expect(lightTheme.ink.basic).toBe(colors["basic-800"]);
    expect(darkTheme.ink.basic).toBe(colors["basic-100"]);
  });

  it("share the palette and tints", () => {
    expect(darkTheme.colors).toBe(lightTheme.colors);
    expect(darkTheme.tints).toBe(lightTheme.tints);
  });
});
