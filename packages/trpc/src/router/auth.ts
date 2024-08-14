import {currentUser} from "@clerk/nextjs/server"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getAuth: publicProcedure.query(({ ctx }) => {
    return ctx.auth;
  }),
  getUser: publicProcedure.query(() => {
    return currentUser()
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @acme/auth package
    return "you can see this secret message!";
  }),
});
