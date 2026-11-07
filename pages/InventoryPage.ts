import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export type ProductSort = "az" | "za" | "lohi" | "hilo";

export class InventoryPage extends BasePage {
  readonly products: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortControl: Locator;

  constructor(page: Page) {
    super(page);
    this.products = page.getByTestId("inventory-item");
    this.productNames = page.getByTestId("inventory-item-name");
    this.productPrices = page.getByTestId("inventory-item-price");
    this.sortControl = page.getByRole("combobox", { name: "Sort products" });
  }

  product(name: string): Locator {
    return this.products.filter({
      has: this.page.getByText(name, { exact: true }),
    });
  }

  async addProduct(name: string): Promise<void> {
    await this.product(name).getByRole("button", { name: "Add to cart" }).click();
  }

  async removeProduct(name: string): Promise<void> {
    await this.product(name).getByRole("button", { name: "Remove" }).click();
  }

  async sortProducts(order: ProductSort): Promise<void> {
    await this.sortControl.selectOption(order);
  }
}
