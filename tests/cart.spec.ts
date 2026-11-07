import { test, expect } from "../fixtures/test";
import { users } from "./data/users";
import { backpack } from "./data/checkout";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
});

test("cart reflects adding and removing a product", async ({ page, inventoryPage, cartPage }) => {
  await expect(inventoryPage.cartBadge).toHaveCount(0);
  await inventoryPage.addProduct(backpack.name);
  await expect(inventoryPage.cartBadge).toHaveText("1");

  await inventoryPage.openCart();
  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(cartPage.item(backpack.name)).toBeVisible();
  await expect(cartPage.item(backpack.name).getByTestId("inventory-item-price")).toHaveText(backpack.price);

  await cartPage.removeItem(backpack.name);
  await expect(cartPage.items).toHaveCount(0);
  await expect(cartPage.cartBadge).toHaveCount(0);
  await cartPage.continueShopping();
  await expect(inventoryPage.title).toHaveText("Products");
});

test("a fresh cart is empty", async ({ inventoryPage, cartPage }) => {
  await inventoryPage.openCart();
  await expect(cartPage.items).toHaveCount(0);
  await expect(cartPage.cartBadge).toHaveCount(0);
});
