import { test, expect } from "../fixtures/test";
import { users } from "./data/users";
import { backpack, checkoutInformation } from "./data/checkout";

test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.addProduct(backpack.name);
  await inventoryPage.openCart();
  await cartPage.checkout();
});

test("customer can complete an order", async ({ page, checkoutPage }) => {
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  await checkoutPage.fillInformation(checkoutInformation);
  await checkoutPage.continue();

  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await expect(checkoutPage.items).toHaveCount(1);
  await expect(checkoutPage.items.getByTestId("inventory-item-name")).toHaveText(backpack.name);
  await expect(checkoutPage.items.getByTestId("inventory-item-price")).toHaveText(backpack.price);
  await expect(checkoutPage.subtotal).toHaveText(`Item total: ${backpack.price}`);
  await expect(checkoutPage.tax).toHaveText(`Tax: ${backpack.tax}`);
  await expect(checkoutPage.total).toHaveText(`Total: ${backpack.total}`);

  await checkoutPage.finish();
  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(checkoutPage.confirmation).toHaveText("Thank you for your order!");
});

for (const scenario of [
  {
    name: "first name",
    information: { ...checkoutInformation, firstName: "" },
    error: "First Name is required",
  },
  {
    name: "last name",
    information: { ...checkoutInformation, lastName: "" },
    error: "Last Name is required",
  },
  {
    name: "postal code",
    information: { ...checkoutInformation, postalCode: "" },
    error: "Postal Code is required",
  },
]) {
  test(`checkout requires ${scenario.name}`, async ({ page, checkoutPage }) => {
    await checkoutPage.fillInformation(scenario.information);
    await checkoutPage.continue();

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(checkoutPage.error).toBeVisible();
    await expect(checkoutPage.error).toContainText(scenario.error);
  });
}
