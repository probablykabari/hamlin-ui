import { describe, expect, it } from "vitest";
import { ramp } from "./ramp";

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
