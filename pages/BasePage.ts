import { type Locator, type Page } from "@playwright/test";

export class BasePage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.getByTestId("title");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.cartLink = page.getByTestId("shopping-cart-link");
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
    await this.page.getByTestId("logout-sidebar-link").click();
  }
}
