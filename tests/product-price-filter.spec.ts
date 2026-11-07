import { test, expect } from "../fixtures/test";
import { users } from "./data/users";

test.describe("Product Inventory - Sorting", () => {
  test("Filter products by price high to low and verify Fleece Jacket", async ({
    loginPage,
    inventoryPage,
  }) => {
    // 1. Navigate to https://www.saucedemo.com/.
    await loginPage.goto();

    // 2. Sign in with valid credentials.
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(inventoryPage.products).toHaveCount(6);
    const originalPrices = await inventoryPage.productPrices.allTextContents();
    for (const price of originalPrices) expect(price).toMatch(/^\$\d+\.\d{2}$/);
    const expectedPrices = [...originalPrices].sort(
      (a, b) => Number(b.slice(1)) - Number(a.slice(1)),
    );

    // 3. Select Price (high to low).
    await inventoryPage.sortProducts("hilo");

    // 4. Verify products are sorted in descending price order and Sauce Labs Fleece Jacket is in the correct position with its price $49.99.
    await expect(inventoryPage.sortControl).toHaveValue("hilo");
    await expect(inventoryPage.productPrices).toHaveText(expectedPrices);
    await expect(inventoryPage.productNames.first()).toHaveText("Sauce Labs Fleece Jacket");
    await expect(inventoryPage.productPrices.first()).toHaveText("$49.99");
  });
});
