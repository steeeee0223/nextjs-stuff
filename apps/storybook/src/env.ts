import { createEnv } from "@t3-oss/env-core";
import { vercel } from "@t3-oss/env-core/presets";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "STORYBOOK_",
  extends: [vercel()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {},
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // LIVEBLOCKS
    STORYBOOK_LIVEBLOCKS_SECRET_KEY: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // LIVEBLOCKS
    STORYBOOK_LIVEBLOCKS_SECRET_KEY:
      process.env.STORYBOOK_LIVEBLOCKS_SECRET_KEY,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
