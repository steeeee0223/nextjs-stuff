import { authRouter } from "./router/auth";
import { documentRouter } from "./router/document";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  document: documentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
