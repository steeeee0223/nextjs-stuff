import { expect, test } from "@playwright/test";

test.describe("authenticated tests", () => {
  test("already signed in", async ({ page }) => {
    await page.goto("/workspace");
    // await page.waitForSelector("h1:has-text('This is a PROTECTED page')");

    await expect(page).toHaveURL("/onboarding");
  });
});
