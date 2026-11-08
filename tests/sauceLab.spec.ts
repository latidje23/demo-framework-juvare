import { test, expect } from "../fixtures/test";
import { users } from "./data/users";

test.describe("Sauce Labs About Navigation", () => {
  test("Verify AI-generated code tagline", async ({ page, loginPage, inventoryPage }) => {
    // 1. Navigate to https://www.saucedemo.com/.
    await loginPage.goto();

    // 2. Sign in with valid credentials.
    await loginPage.login(users.standard.username, users.standard.password);

    // 3. Filter by Price (high to low).
    await inventoryPage.sortProducts("hilo");
    await expect(inventoryPage.sortControl).toHaveValue("hilo");

    // 4. Click Open Menu at the upper left.
    await page.getByRole("button", { name: "Open Menu" }).click();

    // 5. Click About.
    await page.getByTestId("about-sidebar-link").click();

    // 6. Verify the text "Verify AI-generated code at the pace it's written." is visible.
    await expect(
      page.getByRole("heading", { name: "Verify AI-generated code at the pace it's written." }),
    ).toBeVisible();
  });
});
