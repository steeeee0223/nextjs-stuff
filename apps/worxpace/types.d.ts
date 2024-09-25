/**
 * Since the ecosystem hasn't fully migrated to ESLint's new FlatConfig system yet,
 * we "need" to type some of the plugins manually :(
 */

declare module "@prisma/nextjs-monorepo-workaround-plugin" {
  import type { Compiler } from "webpack";

  export class PrismaPlugin {
    apply(compiler: Compiler): Promise<void>;
  }
}
