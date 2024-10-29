import baseConfig from "@swy/eslint-config/base";
import nextjsConfig from "@swy/eslint-config/nextjs";
import reactConfig from "@swy/eslint-config/react";
import storybookConfig from "@swy/eslint-config/storybook";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**", "next-env.d.ts", "public/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...storybookConfig,
];
