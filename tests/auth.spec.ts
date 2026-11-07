import { test, expect } from "../fixtures/test";
import { users } from "./data/users";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test("standard user can sign in and log out", async ({ page, loginPage, inventoryPage }) => {
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventoryPage.title).toHaveText("Products");
  await expect(inventoryPage.products).toHaveCount(6);

  await inventoryPage.logout();
  await expect(page).toHaveURL(/\/$/);
  await expect(loginPage.loginButton).toBeVisible();
});

for (const scenario of [
  { name: "missing username", username: "", password: "", error: "Username is required" },
  { name: "missing password", username: users.standard.username, password: "", error: "Password is required" },
  { name: "invalid credentials", ...users.invalid, error: "Username and password do not match any user in this service" },
  { name: "locked-out account", ...users.lockedOut, error: "Sorry, this user has been locked out." },
]) {
  test(`login rejects ${scenario.name}`, async ({ page, loginPage }) => {
    await loginPage.login(scenario.username, scenario.password);

    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).toContainText(scenario.error);
    await expect(page).toHaveURL(/\/$/);
  });
}

test("inventory requires authentication", async ({ page, loginPage }) => {
  await page.goto("/inventory.html");

  await expect(page).toHaveURL(/\/$/);
  await expect(loginPage.error).toContainText("You can only access '/inventory.html' when you are logged in.");
  await expect(loginPage.loginButton).toBeVisible();
});
