/// <reference types="vitest" />

import path from "path";
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
  resolve: {
    alias: { "~": path.resolve(__dirname, "./src") },
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      // module: { type: "es6" },
    }),
  ],
});
