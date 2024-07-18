import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"],
  afterAuth(auth, req) {
    // After sign up
    if (req.url.startsWith("/sign-up")) {
      return NextResponse.redirect("/onboarding");
    }

    if (auth.userId && auth.isPublicRoute) {
      // const path = auth.orgId
      //   ? `/organization/${auth.orgId}`
      //   : `/personal/${auth.userId}`;
      const url = new URL(`/`, req.url);
      return NextResponse.redirect(url);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
