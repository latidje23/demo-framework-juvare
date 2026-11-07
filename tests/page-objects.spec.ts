import { test, expect } from "../fixtures/test";
import { users } from "./data/users";
import { backpack, checkoutInformation } from "./data/checkout";

test("page objects support cart and checkout actions", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(inventoryPage.title).toHaveText("Products");

  await inventoryPage.sortProducts("lohi");
  await expect(inventoryPage.sortControl).toHaveValue("lohi");
  await expect(inventoryPage.productNames.first()).toHaveText("Sauce Labs Onesie");
  await inventoryPage.addProduct(backpack.name);
  await inventoryPage.addProduct("Sauce Labs Bike Light");
  await inventoryPage.removeProduct("Sauce Labs Bike Light");
  await expect(inventoryPage.cartBadge).toHaveText("1");

  await inventoryPage.openCart();
  await expect(cartPage.item(backpack.name)).toBeVisible();
  await cartPage.checkout();
  await checkoutPage.cancel();
  await expect(cartPage.item(backpack.name)).toBeVisible();
  await cartPage.checkout();
  await checkoutPage.continue();
  await expect(checkoutPage.error).toContainText("First Name is required");

  await checkoutPage.fillInformation(checkoutInformation);
  await checkoutPage.continue();
  await expect(checkoutPage.items).toHaveCount(1);
  await expect(checkoutPage.subtotal).toContainText("Item total:");
  await expect(checkoutPage.tax).toContainText("Tax:");
  await expect(checkoutPage.total).toContainText("Total:");
  await checkoutPage.finish();
  await expect(checkoutPage.confirmation).toContainText("Thank you for your order");
  await checkoutPage.backToProducts();
  await expect(inventoryPage.title).toHaveText("Products");
  await inventoryPage.logout();
  await expect(loginPage.loginButton).toBeVisible();
});

test("fixtures start with a clean browser context", async ({ loginPage }) => {
  await loginPage.goto();
  await expect(loginPage.username).toBeEmpty();
  await loginPage.login(users.lockedOut.username, users.lockedOut.password);
  await expect(loginPage.error).toContainText("locked out");
});

test("cart item can be removed using its page object", async ({
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.addProduct(backpack.name);
  await inventoryPage.openCart();
  await cartPage.removeItem(backpack.name);
  await expect(cartPage.items).toHaveCount(0);
  await expect(cartPage.cartBadge).toHaveCount(0);
  await cartPage.continueShopping();
  await expect(inventoryPage.title).toHaveText("Products");
});
