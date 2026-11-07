import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { HomePage } from "../pages/HomePage";
import { FooterPage } from "../pages/FooterPage";

type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  homePage: HomePage;
  footerPage: FooterPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page, baseURL }, use) => {
    if (!baseURL) {
      throw new Error("The homePage fixture requires a configured baseURL.");
    }
    await page.goto(baseURL);
    await use(new HomePage(page));
    await page.close();
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
    await page.close();
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
    await page.close();
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
    await page.close();
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
    await page.close();
  },
  footerPage: async ({ page }, use) => {
    await use(new FooterPage(page));
    await page.close();
  },
});

export { expect };
