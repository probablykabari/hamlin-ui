import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    styles: "src/styles/index.ts",
  },
  format: "esm",
  dts: true,
});
