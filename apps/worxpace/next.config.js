import { fileURLToPath } from "url";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@swy/liveblocks",
    "@swy/prisma",
    "@swy/ui",
    "@swy/validators",
    "lucide-react",
  ],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  /**  */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      /** To Fix Prisma */
      /** See https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-monorepo */
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

export default config;
