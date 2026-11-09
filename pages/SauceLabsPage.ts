import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SauceLabsPage extends BasePage {
  readonly menuButton: Locator;
  readonly aboutLink: Locator;
  readonly aiGeneratedCodeMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.aboutLink = page.getByRole("link", { name: "About" });
    this.aiGeneratedCodeMessage = page.getByText(
      "Verify AI-generated code at the pace it's written.",
      { exact: true },
    );
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async openAbout(): Promise<void> {
    await this.aboutLink.click();
  }
}
