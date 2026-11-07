import { test, expect } from "../fixtures/test";
import { users } from "./data/users";
import { type ProductSort } from "../pages/InventoryPage";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
});

test("inventory displays product names and prices", async ({ page, inventoryPage }) => {
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventoryPage.title).toHaveText("Products");
  await expect(inventoryPage.products).toHaveCount(6);
  await expect(inventoryPage.productNames).toHaveCount(6);
  await expect(inventoryPage.productPrices).toHaveCount(6);

  for (const product of await inventoryPage.products.all()) {
    await expect(product.getByTestId("inventory-item-name")).not.toBeEmpty();
    await expect(product.getByTestId("inventory-item-price")).toHaveText(/^\$\d+\.\d{2}$/);
  }
});

const sortingCases: { order: ProductSort; name: string; field: "name" | "price"; descending: boolean }[] = [
  { order: "az", name: "name ascending", field: "name", descending: false },
  { order: "za", name: "name descending", field: "name", descending: true },
  { order: "lohi", name: "price ascending", field: "price", descending: false },
  { order: "hilo", name: "price descending", field: "price", descending: true },
];

for (const { order, name, field, descending } of sortingCases) {
  test(`products sort by ${name}`, async ({ inventoryPage }) => {
    await expect(inventoryPage.products).toHaveCount(6);

    if (field === "name") {
      const originalNames = await inventoryPage.productNames.allTextContents();
      const expected = [...originalNames].sort((a, b) => a.localeCompare(b));
      if (descending) expected.reverse();

      await inventoryPage.sortProducts(order);
      await expect(inventoryPage.sortControl).toHaveValue(order);
      await expect(inventoryPage.productNames).toHaveText(expected);
    } else {
      const originalPrices = await inventoryPage.productPrices.allTextContents();
      for (const price of originalPrices) expect(price).toMatch(/^\$\d+\.\d{2}$/);
      const expected = [...originalPrices].sort(
        (a, b) => (Number(a.slice(1)) - Number(b.slice(1))) * (descending ? -1 : 1),
      );

      await inventoryPage.sortProducts(order);
      await expect(inventoryPage.sortControl).toHaveValue(order);
      await expect(inventoryPage.productPrices).toHaveText(expected);
    }
  });
}
