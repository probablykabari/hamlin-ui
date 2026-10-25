import { afterEach, describe, expect, it, vi } from "vitest";
import { createFont, lineHeight, ramp } from "./typography";

const platform = vi.hoisted(() => ({ OS: "ios" }));
vi.mock("react-native", () => ({ Platform: platform }));

afterEach(() => {
  platform.OS = "ios";
});

describe("ramp", () => {
  it("builds the scale from the start size", () => {
    expect(Object.values(ramp(11))).toEqual([11, 12, 13, 14, 16, 18, 21, 25, 30, 36, 42, 50, 60, 71, 85, 101]);
  });

  it("grows each step by 5% to 19%", () => {
    // A large start keeps the per-step rounding error under 0.1%.
    const steps = Object.values(ramp(1000));
    for (let i = 1; i < steps.length; i++) {
      const growth = steps[i] / steps[i - 1];
      expect(growth).toBeGreaterThanOrEqual(1.049);
      expect(growth).toBeLessThanOrEqual(1.191);
    }
  });
});

describe("lineHeight", () => {
  it("runs tighter on native than on web", () => {
    expect(lineHeight(16, "native")).toBe(23);
    expect(lineHeight(16, "web")).toBe(25);
  });
});

describe("createFont", () => {
  it("fills weight forward from the previous key", () => {
    const font = createFont({ family: "Inter", weight: { 9: "700" } });
    expect(font.weight[1]).toBe("400");
    expect(font.weight[8]).toBe("400");
    expect(font.weight[9]).toBe("700");
    expect(font.weight[16]).toBe("700");
  });

  it("carries a letter spacing override up to the larger sizes", () => {
    const font = createFont({ family: "Inter", letterSpacing: { 12: -1.5 } });
    expect(font.letterSpacing[1]).toBe(0);
    expect(font.letterSpacing[11]).toBe(0);
    expect(font.letterSpacing[12]).toBe(-1.5);
    expect(font.letterSpacing[16]).toBe(-1.5);
  });

  it("merges size overrides over the default ramp", () => {
    const font = createFont({ family: "Inter", size: { 5: 17 } });
    expect(font.size[4]).toBe(14);
    expect(font.size[5]).toBe(17);
  });

  it("applies a line height function to every size", () => {
    const font = createFont({ family: "Inter", lineHeight: (size) => size * 2 });
    expect(font.lineHeight[5]).toBe(32);
    expect(font.lineHeight[16]).toBe(202);
  });

  it("carries a line height override upward as an offset from the rule", () => {
    const font = createFont({ family: "Inter", lineHeight: { 5: 30 } });
    const offset = 30 - lineHeight(16, "native");
    expect(font.lineHeight[4]).toBe(lineHeight(14, "native"));
    expect(font.lineHeight[5]).toBe(30);
    expect(font.lineHeight[6]).toBe(lineHeight(18, "native") + offset);
    expect(font.lineHeight[16]).toBe(lineHeight(101, "native") + offset);
  });

  it("uses named faces on native and falls back to the family", () => {
    const font = createFont({ family: "Inter", face: { "700": "Inter-Bold" } });
    expect(font.face["700"]).toBe("Inter-Bold");
    expect(font.face["400"]).toBe("Inter");
  });

  it("uses the web family and line height on web and ignores faces", () => {
    platform.OS = "web";
    const font = createFont({ family: "Inter", webFamily: "Inter, sans-serif", face: { "700": "Inter-Bold" } });
    expect(font.family).toBe("Inter, sans-serif");
    expect(font.face["700"]).toBe("Inter, sans-serif");
    expect(font.lineHeight[5]).toBe(lineHeight(16, "web"));
  });
});
