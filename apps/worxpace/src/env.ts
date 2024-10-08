import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";

export const env = createEnv({
  extends: [vercel()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.coerce.number().default(3001),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    DB_AUTH: z.string(),
    DB_WORXPACE: z.string(),
    // LIVEBLOCKS
    LIVEBLOCKS_SECRET_KEY: z.string(),
    // CLERK
    CLERK_SECRET_KEY: z.string(),
    // EDGESTORE
    EDGE_STORE_ACCESS_KEY: z.string(),
    EDGE_STORE_SECRET_KEY: z.string(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // CLERK
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    // UNSPLASH
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // NEXT
    PORT: process.env.PORT,
    // CLERK
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    // DB
    DB_AUTH: process.env.DB_AUTH,
    DB_WORXPACE: process.env.DB_WORXPACE,
    // EDGESTORE
    EDGE_STORE_ACCESS_KEY: process.env.EDGE_STORE_ACCESS_KEY,
    EDGE_STORE_SECRET_KEY: process.env.EDGE_STORE_SECRET_KEY,
    // LIVEBLOCKS
    LIVEBLOCKS_SECRET_KEY: process.env.LIVEBLOCKS_SECRET_KEY,
    // UNSPLASH
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY:
      process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
