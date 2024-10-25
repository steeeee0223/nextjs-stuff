/// <reference types="vitest" />

import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./__test__/setup.ts",
    coverage: {
      enabled: true,
      reporter: ["text", "json", "html"],
    },
  },
});
