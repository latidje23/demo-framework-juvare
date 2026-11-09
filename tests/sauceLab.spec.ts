import { test, expect } from "../fixtures/test";
import { users } from "./data/users";

test.describe("SauceDemo About Navigation", () => {
  test("Verify the About page message", async ({ loginPage, sauceLabsPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await sauceLabsPage.openMenu();
    await sauceLabsPage.openAbout();
    await expect(sauceLabsPage.aiGeneratedCodeMessage).toBeVisible();
  });
});
