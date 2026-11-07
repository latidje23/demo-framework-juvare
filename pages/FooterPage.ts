import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FooterPage extends BasePage {
  readonly socialLinks: Locator;
  readonly xLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedInLink: Locator;
  readonly copyrightText: Locator;
  readonly footerContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.socialLinks = page.locator("footer, [role='contentinfo']").locator("ul a");
    this.xLink = page
      .locator("footer, [role='contentinfo']")
      .locator("a")
      .filter({ hasText: "X" });
    this.facebookLink = page
      .locator("footer, [role='contentinfo']")
      .locator("a")
      .filter({ hasText: "Facebook" });
    this.linkedInLink = page
      .locator("footer, [role='contentinfo']")
      .locator("a")
      .filter({ hasText: "LinkedIn" });
    this.copyrightText = page.locator("footer, [role='contentinfo']");
    this.footerContainer = page.locator("footer, [role='contentinfo']");
  }

  async verifyXLinkExists(): Promise<void> {
    await this.xLink.isVisible();
  }

  async verifyFacebookLinkExists(): Promise<void> {
    await this.facebookLink.isVisible();
  }

  async verifyLinkedInLinkExists(): Promise<void> {
    await this.linkedInLink.isVisible();
  }

  async getXLinkHref(): Promise<string | null> {
    return this.xLink.getAttribute("href");
  }

  async getFacebookLinkHref(): Promise<string | null> {
    return this.facebookLink.getAttribute("href");
  }

  async getLinkedInLinkHref(): Promise<string | null> {
    return this.linkedInLink.getAttribute("href");
  }

  async scrollToFooter(): Promise<void> {
    await this.page.keyboard.press("End");
  }
}
