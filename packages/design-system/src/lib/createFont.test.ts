import { afterEach, describe, expect, it, vi } from "vitest";
import { createFont } from "./createFont";

const platform = vi.hoisted(() => ({ OS: "ios" }));
vi.mock("react-native", () => ({ Platform: platform }));

afterEach(() => {
  platform.OS = "ios";
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
    expect(font.size[4]).toBe(17);
    expect(font.size[5]).toBe(17);
  });

  it("applies a line height function to every size", () => {
    const font = createFont({ family: "Inter", lineHeight: (size) => size * 2 });
    expect(font.lineHeight[5]).toBe(38);
    expect(font.lineHeight[16]).toBe(238);
  });

  it("carries a line height override upward as an offset from the rule", () => {
    // The native rule gives 27 at step 5, so the override adds 3 from step 5 up.
    const font = createFont({ family: "Inter", lineHeight: { 5: 30 } });
    expect(font.lineHeight[4]).toBe(24);
    expect(font.lineHeight[5]).toBe(30);
    expect(font.lineHeight[6]).toBe(33);
    expect(font.lineHeight[16]).toBe(150);
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
    expect(font.lineHeight[5]).toBe(25);
  });
});
