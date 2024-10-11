import { clerkSetup, setupClerkTestingToken } from "@clerk/testing/playwright";
import { test as setup } from "@playwright/test";

setup("global setup", async () => {
  await clerkSetup();
});

const authFile = "./.cache/e2e/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/");
  await setupClerkTestingToken({ page });
  // Mock Clerk authentication (simulating a Google or GitHub login)
  await page.route("https://api.clerk.dev/v1/users/*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: "mock-user-id",
        email_addresses: [{ email_address: "test@example.com" }],
        external_accounts: [{ provider: "google" }], // Simulate Google login
      }),
    });
  });
  await page.route(
    "https://api.clerk.dev/v1/users/*/oauth_access_tokens/oauth_google",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          provider: "oauth_google",
          token: "ya29...",
          scopes: [
            "email",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "openid",
            "profile",
          ],
        }),
      });
    },
  );
  await page.context().storageState({ path: authFile });
});
