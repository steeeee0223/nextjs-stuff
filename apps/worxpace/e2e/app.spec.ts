import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { expect, test } from "@playwright/test";

test.describe("Authenticated user redirection", () => {
  test("redirect to /onboarding if user has no workspace", async ({ page }) => {
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

    // Mock database response for no workspace
    // await page.route("**/api/workspace", async (route) => {
    //   await route.fulfill({
    //     status: 200,
    //     contentType: "application/json",
    //     body: JSON.stringify([]), // No workspace found
    //   });
    // });
    // Mock the SWR fetcher in the browser context

    // Navigate to the app's root
    await page.goto("/select-role");
    await setupClerkTestingToken({ page });

    await page
      .getByRole("button", { name: "Sign in with Google Continue" })
      .click();

    // Expect redirection to /onboarding
    await expect(page).toHaveURL("/onboarding");
  });

  test("redirect to /workspace/[workspaceId] if user has a workspace", async ({
    page,
  }) => {
    // Mock Clerk authentication (simulating a Google or GitHub login)
    await page.route("https://api.clerk.dev/v1/users/*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "mock-user-id",
          email_addresses: [{ email_address: "test@example.com" }],
          external_accounts: [{ provider: "github" }], // Simulate GitHub login
        }),
      });
    });

    // Mock database response with a workspace
    await page.route("**/api/workspace", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          { id: "workspace-id-123", name: "My Workspace" },
        ]), // Simulate workspace found
      });
    });

    // Navigate to the app's root
    await page.goto("/");

    // Expect redirection to /workspace/[workspaceId]
    await expect(page).toHaveURL("/workspace/workspace-id-123");
  });
});
