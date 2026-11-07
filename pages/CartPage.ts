import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.getByTestId("inventory-item");
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  item(name: string): Locator {
    return this.items.filter({
      has: this.page.getByText(name, { exact: true }),
    });
  }

  async removeItem(name: string): Promise<void> {
    await this.item(name).getByRole("button", { name: "Remove" }).click();
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole("button", { name: "Continue Shopping" }).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
