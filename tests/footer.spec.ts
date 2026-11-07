// spec: Footer verification test - POM pattern compliant
import { test, expect } from "../fixtures/test";
import { users } from "./data/users";

test.describe("Footer", () => {
  test("verify footer elements after login", async ({ loginPage, footerPage }) => {
    // Navigate to login page
    await loginPage.goto();

    // Login using standard user credentials
    await loginPage.login(users.standard.username, users.standard.password);

    // Scroll down to footer
    await footerPage.scrollToFooter();

    // Verify X link exists and has correct href
    await expect(footerPage.xLink).toBeVisible();
    await expect(footerPage.xLink).toHaveAttribute("href", "https://x.com/saucelabs");

    // Verify Facebook link exists and has correct href
    await expect(footerPage.facebookLink).toBeVisible();
    await expect(footerPage.facebookLink).toHaveAttribute(
      "href",
      "https://www.facebook.com/saucelabs"
    );

    // Verify LinkedIn link exists and has correct href
    await expect(footerPage.linkedInLink).toBeVisible();
    await expect(footerPage.linkedInLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/sauce-labs/"
    );

    // Verify copyright and legal text exists
    await expect(footerPage.copyrightText).toContainText(
      "© 2026 Sauce Labs. All Rights Reserved."
    );
    await expect(footerPage.copyrightText).toContainText("Terms of Service");
    await expect(footerPage.copyrightText).toContainText("Privacy Policy");
  });
});

