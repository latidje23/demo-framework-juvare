import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export interface CheckoutInformation {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly error: Locator;
  readonly items: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly confirmation: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId("firstName");
    this.lastName = page.getByTestId("lastName");
    this.postalCode = page.getByTestId("postalCode");
    this.error = page.getByTestId("error");
    this.items = page.getByTestId("inventory-item");
    this.subtotal = page.getByTestId("subtotal-label");
    this.tax = page.getByTestId("tax-label");
    this.total = page.getByTestId("total-label");
    this.confirmation = page.getByTestId("complete-header");
  }

  async fillInformation(information: CheckoutInformation): Promise<void> {
    await this.firstName.fill(information.firstName);
    await this.lastName.fill(information.lastName);
    await this.postalCode.fill(information.postalCode);
  }

  async continue(): Promise<void> {
    await this.page.getByRole("button", { name: "Continue", exact: true }).click();
  }

  async finish(): Promise<void> {
    await this.page.getByRole("button", { name: "Finish" }).click();
  }

  async cancel(): Promise<void> {
    await this.page.getByRole("button", { name: "Cancel" }).click();
  }

  async backToProducts(): Promise<void> {
    await this.page.getByRole("button", { name: "Back Home" }).click();
  }
}
