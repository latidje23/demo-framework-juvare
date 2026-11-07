import { test, expect } from "../fixtures/test";

test("home page opens at the configured base URL", async ({ homePage, page, baseURL }) => {
  if (!baseURL) {
    throw new Error("The test requires a configured baseURL.");
  }

  await expect(page).toHaveURL(new URL(baseURL).href);
  await expect(homePage.loginButton).toBeVisible();
});
