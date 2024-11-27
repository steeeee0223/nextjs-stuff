import type { Config } from "tailwindcss";

import baseConfig from "@swy/tailwind-config";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    "../../packages/notion/src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {},
  },
} satisfies Config;
