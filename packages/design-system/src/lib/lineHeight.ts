// Native runs tighter because its text box has no half leading above the cap line.
export const lineHeight = (size: number, platform: "native" | "web"): number =>
  platform === "native" ? Math.round(size * 1.2 + 4) : Math.round(size * 1.35 + 3);
