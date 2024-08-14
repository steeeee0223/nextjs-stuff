/// <reference types="vitest" />

import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig, type UserConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()] as UserConfig["plugins"],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./__test__/setup.ts",
    coverage: {
      enabled: true,
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
