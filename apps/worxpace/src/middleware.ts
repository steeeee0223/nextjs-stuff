import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/public(.*)", "/invite(.*)"]);
const isProtectedRoute = createRouteMatcher([
  // API
  "/api(.*)",
  // Clerk
  "/onboarding",
  "/select-role",
  // Tools
  "/document(.*)",
  "/kanban(.*)",
  "/whiteboard(.*)",
  "/workflow(.*)",
  "/workspace(.*)",
]);

export default clerkMiddleware(
  (auth, req) => {
    const authObj = auth();
    if (isPublicRoute(req)) return;
    if (!authObj.userId && isProtectedRoute(req)) authObj.protect();
  },
  {
    afterSignUpUrl: "/onboarding",
    afterSignInUrl: "/select-role",
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
