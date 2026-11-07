---
description: "Playwright and SauceDemo test conventions: Page Object Model, fixtures, and test data."
applyTo: "tests/**/*.ts,fixtures/**/*.ts,pages/**/*.ts,utils/**/*.ts,playwright.config.ts"
---

# Playwright Testing Instructions

Single source of truth for generating and maintaining this project's Playwright tests. Follow the Page Object Model (POM) for all tests.

## Core Rules

- Tests import `test` and `expect` from `../fixtures/test` and use fixture-injected page objects. Never import page objects directly or use raw `page.locator()` for test interactions.
- Page objects extend `BasePage`, live in `pages/`, and contain only `readonly` locator properties and asynchronous user-action methods. Do not put assertions in page objects.
- Register each page object in `fixtures/test.ts`. Reuse existing page objects, fixtures, and helpers before creating new ones.
- Keep assertions in tests and use page-object locators in those assertions.
- Store reusable credentials and test data in `tests/data/`; do not hardcode them in tests.
- Prefer locators in this order: `getByTestId()` (backed by `data-test` attributes), accessible roles with `getByRole()`, then `getByLabel()`. Avoid CSS classes, broad selectors, and XPath.
- Use `test.describe()` to group tests and `test.beforeEach()` for shared setup. Add comments only to explain non-obvious intent.
- Do not use `page.waitForNavigation()`, `page.waitForLoadState()`, `page.waitForTimeout()`, or `page.evaluate()`. Prefer Playwright's auto-waiting, explicit assertions, and APIs. Do not create duplicate page objects for similar pages or leave `test.only()` in committed code.

## Evidence and Verification

- Verify page-object methods, fixtures, test data, configuration, and APIs in the current project before using them. Treat examples as illustrative, not authoritative.
- Verify UI behavior, locators, and expected values from the application, requirements, or test evidence. Do not invent missing behavior or selectors.
- If necessary evidence is unavailable or requirements are ambiguous, state the limitation and ask for clarification rather than guessing.
- Assert the requested outcome directly, including relationships and ordering; element presence alone does not prove a sort, price association, or workflow.
- Report commands actually run and their outcomes. Never claim a test passed if it was not run or did not complete; report failures, skipped checks, and blockers.
- Distinguish observed facts from assumptions and unverified conclusions.

## Diagnose a Playwright Failure

1. Identify the failing test and assertion, expected and actual behavior, and reproduction command. Gather available traces, screenshots, and logs; request missing evidence if needed.
2. Reproduce the failure when possible. Inspect the relevant test, fixture, page object, configuration, test data, and UI. Determine the root cause from evidence; do not assume the application is at fault.
3. Make the smallest safe fix, preserving POM and test intent. Do not weaken assertions, hide exceptions, or add arbitrary waits.
4. Rerun the failing test, `npm run lint`, and `npm run typecheck`. Report the evidence, root cause, commands and results, remaining uncertainty, and what a human reviewer should verify.

## POM Structure

### Page objects

Page objects encapsulate locators and user actions for a UI area. Existing objects include:

- `LoginPage` — login, logout, and error handling
- `InventoryPage` — product listing, sorting, and filtering
- `CartPage` — cart operations and item management
- `CheckoutPage` — checkout workflow and form validation
- `FooterPage` — footer elements and links
- `HomePage` — home page elements

Example:

```typescript
export class InventoryPage extends BasePage {
  readonly products: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.products = page.getByTestId("inventory-item");
    this.productNames = page.getByTestId("inventory-item-name");
    this.productPrices = page.getByTestId("inventory-item-price");
  }

  async sortProducts(order: ProductSort): Promise<void> {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(order);
  }
}
```

### Fixtures

Register page objects in `fixtures/test.ts` for typed dependency injection:

```typescript
import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

export const test = baseTest.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export { expect } from "@playwright/test";
```

### Tests

Tests import test data and use injected page objects for interactions:

```typescript
import { test, expect } from "../fixtures/test";
import { users } from "./data/users";

test.describe("Authentication", () => {
  test("standard user can sign in and log out", async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(inventoryPage.title).toHaveText("Products");
    await expect(inventoryPage.products).toHaveCount(6);

    await inventoryPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
```

Never write test interactions with raw page selectors, construct page objects directly in tests, or put assertions in page objects.

### Test data

- `tests/data/users.ts` — credentials for all account types
- `tests/data/checkout.ts` — checkout form data

Example:

```typescript
export const users = {
  standard: { username: "standard_user", password: "secret_sauce" },
  lockedOut: { username: "locked_out_user", password: "secret_sauce" },
  problem: { username: "problem_user", password: "secret_sauce" },
  performanceGlitch: { username: "performance_glitch_user", password: "secret_sauce" },
  error: { username: "error_user", password: "secret_sauce" },
  visual: { username: "visual_user", password: "secret_sauce" },
};
```

### BasePage

All page objects extend `BasePage`:

```typescript
import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = ""): Promise<void> {
    await this.page.goto(this.page.context().baseURL + path);
  }
}
```

## Test Patterns

### Login error

Keep test inputs in the project's test-data files:

```typescript
test("login fails with invalid credentials", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.invalid.username, users.invalid.password);
  await expect(loginPage.error).toBeVisible();
  await expect(loginPage.error).toContainText("Username and password do not match");
});
```

### Multi-step workflow

```typescript
test("customer can complete checkout", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  await inventoryPage.addItemToCart("Sauce Labs Bike Light");

  await cartPage.goto();
  await expect(cartPage.cartItems).toHaveCount(2);
  await cartPage.checkout();
  await checkoutPage.fillPersonalInfo(checkoutData.standard);
  await checkoutPage.submitOrder();
  await expect(checkoutPage.successMessage).toBeVisible();
});
```

### Data-driven tests

```typescript
test.describe("Login scenarios", () => {
  const scenarios = [
    { name: "standard user", user: users.standard, expected: "inventory" },
    { name: "locked out user", user: users.lockedOut, expected: "error" },
  ];

  scenarios.forEach((scenario) => {
    test(`login ${scenario.name}`, async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.login(scenario.user.username, scenario.user.password);

      if (scenario.expected === "error") {
        await expect(loginPage.error).toBeVisible();
      } else {
        await expect(page).toHaveURL(/.*inventory/);
      }
    });
  });
});
```

## Generating and Refactoring Tests

The `playwright-test-generator` records browser interactions and produces raw Playwright code with inline selectors. Treat generated code as a reference, not finished test code. Refactor it before adding it to the suite:

1. Inspect relevant UI, tests, page objects, fixtures, and test data.
2. Reuse or add page-object locators and action methods in `pages/`.
3. Register any new page object in `fixtures/test.ts`.
4. Rewrite the test to use fixture-injected page objects and centralized data.
5. Verify the test uses no direct page-object imports or raw selectors, and keep assertions in the test.

Example transformation:

```typescript
// Generated code (temporary)
await page.locator('[data-test="username"]').fill("standard_user");
```

```typescript
// Final test code
await loginPage.login(users.standard.username, users.standard.password);
```

For example, replace direct navigation, username/password selectors, login-button clicks, sort selectors, and item selectors with `loginPage.goto()`, `loginPage.login(...)`, `inventoryPage.sortProducts("hilo")`, and page-object assertions:

```typescript
import { test, expect } from "../fixtures/test";
import { users } from "./data/users";

test.describe("Product Inventory - Sorting", () => {
  test("filter products by Price (high to low) and verify Fleece Jacket", async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.sortProducts("hilo");
    await expect(inventoryPage.productNames).toContainText("Sauce Labs Fleece Jacket");
    await expect(inventoryPage.productPrices).toContainText("$49.99");
  });
});
```

This removes hardcoded credentials and selectors, reuses page objects and fixtures, and keeps the test readable and maintainable.

## Project Layout

```text
demo-juvare/
├── tests/
│   ├── auth.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── inventory.spec.ts
│   ├── product-price-filter.spec.ts
│   └── data/
│       ├── users.ts
│       └── checkout.ts
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── FooterPage.ts
├── fixtures/
│   └── test.ts
├── utils/
│   └── environment.ts
├── playwright.config.ts
└── ai-artifacts/
    └── instructions/
        └── playwright-ai-artifacts.instruction.md
```

## Before Writing Tests or Page Objects

- Inspect the relevant UI and existing tests.
- Check existing page objects in `pages/` and fixtures in `fixtures/test.ts`.
- Review test data in `tests/data/` and similar tests in `tests/`.
- Use the configured base URL; do not invent application behavior.
- Reuse existing page objects and fixtures.

## Related Files

| File | Purpose |
|------|---------|
| `fixtures/test.ts` | Registers page objects as fixtures |
| `pages/BasePage.ts` | Base class for page objects |
| `pages/LoginPage.ts` | Page-object example |
| `tests/auth.spec.ts` | POM test example |
| `tests/product-price-filter.spec.ts` | Refactored POM test example |

POM is mandatory: fixtures provide page objects, test data is centralized, assertions stay in tests, and tests use page-object locators. Reuse existing code before creating new code. These conventions provide maintainable tests, centralized selectors, typed fixture injection, and consistent, readable tests that are easier to update when the UI changes.

This is the project's Playwright testing instruction file; agents and developers creating or maintaining tests must follow it.
