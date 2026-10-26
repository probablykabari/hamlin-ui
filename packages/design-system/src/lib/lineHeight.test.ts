import { describe, expect, it } from "vitest";
import { lineHeight } from "./lineHeight";

describe("lineHeight", () => {
  it("runs tighter on native than on web", () => {
    expect(lineHeight(16, "native")).toBe(23);
    expect(lineHeight(16, "web")).toBe(25);
  });
});
