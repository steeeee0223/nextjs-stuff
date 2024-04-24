import { defineConfig } from "tsup";

export default defineConfig([
  {
    banner: {
      js: `"use client";\nimport * as React from "react";`,
    },
    entry: {
      custom: "src/components/custom/index.ts",
      dnd: "src/components/dnd/index.ts",
      form: "src/components/form/index.ts",
      notion: "src/components/notion/index.ts",
      shadcn: "src/components/ui/index.ts",
      hooks: "src/hooks/index.ts",
    },
    splitting: false,
    target: "esnext",
    sourcemap: true,
    clean: false,
    dts: true,
    tsconfig: "tsconfig.json",
  },
  {
    entry: {
      lib: "src/lib/index.ts",
    },
    splitting: false,
    target: "esnext",
    sourcemap: true,
    clean: false,
    dts: true,
    format: "esm",
    tsconfig: "tsconfig.json",
  },
]);
