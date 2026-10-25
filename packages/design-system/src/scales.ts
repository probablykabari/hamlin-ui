export const size = {
  0: 0,
  "0-25": 2,
  "0-5": 4,
  "0-75": 8,
  1: 20,
  "1-5": 24,
  2: 28,
  "2-5": 32,
  3: 36,
  "3-5": 40,
  4: 44,
  "4-5": 48,
  5: 52,
  6: 64,
  7: 74,
  8: 84,
  9: 94,
  10: 104,
  11: 124,
  12: 144,
  13: 164,
  14: 184,
  15: 204,
  16: 224,
  17: 224,
  18: 244,
  19: 264,
  20: 284,
} as const;

function sizeToSpace(v: number) {
  if (v === 0) return 0;
  if (v === 2) return 0.5;
  if (v === 4) return 1;
  if (v === 8) return 1.5;
  if (v <= 16) return Math.round(v * 0.333);
  return Math.floor(v * 0.7 - 12);
}

export const space = Object.fromEntries(
  Object.entries(size).map(([k, v]) => [k, sizeToSpace(v)]),
) as Record<keyof typeof size, number>;

export const radius = {
  0: 0,
  1: 2,
  2: 4,
  3: 5,
  4: 7,
  5: 9,
  6: 12,
  7: 16,
  8: 19,
  9: 22,
  10: 26,
  11: 34,
  12: 42,
} as const;
