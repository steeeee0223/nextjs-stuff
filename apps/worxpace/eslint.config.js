import baseConfig, { restrictEnvAccess } from "@swy/eslint-config/base";
import nextjsConfig from "@swy/eslint-config/nextjs";
import reactConfig from "@swy/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
