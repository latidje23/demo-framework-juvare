---
description: "Use when creating or maintaining SauceDemo Playwright TypeScript tests, page objects, fixtures, and locators."
applyTo: "tests/**/*.ts,fixtures/**/*.ts,pages/**/*.ts,utils/**/*.ts,playwright.config.ts"
---

# Playwright and TypeScript guidelines

## Page Object Model (POM) Pattern - REQUIRED

All tests MUST follow the Page Object Model pattern:

- **Page Objects**: Create a class extending `BasePage` for each page/component. Each page object encapsulates locators and user actions specific to that UI area.
  - Example: `LoginPage`, `InventoryPage`, `CartPage`, `FooterPage`
  - Located in `pages/` directory
  - Export typed methods for user actions (e.g., `async login(username, password)`)
  - Define locators as readonly properties (e.g., `readonly username: Locator`)

- **Fixtures**: Register page objects as fixtures in `fixtures/test.ts` to provide type-safe dependency injection.
  - Each page object gets its own fixture
  - Fixtures are provided to tests as parameters
  - Never import page objects directly in tests

- **Test Code**: Import fixtures from `fixtures/test` and use fixture-injected page objects.
  - Use page object methods for navigation and interactions
  - Use page object locators only in assertions
  - Never use raw `page.goto()`, `page.getByTestId()`, or complex locators in tests
  - Keep all assertions in tests, all locators in page objects

❌ **WRONG**: `const xLink = page.locator('a').filter({ hasText: 'X' }); await expect(xLink).toBeVisible();`
✅ **RIGHT**: `await expect(footerPage.xLink).toBeVisible();` (locator defined in `FooterPage`)

## Implementation Guidelines

- Inspect the relevant UI and existing tests, page objects, fixtures, and test data before writing code. Use the existing base URL and avoid inventing application behavior.
- Prefer accessible `getByRole` or `getByLabel` locators. Use `getByTestId` for stable application test IDs; this project configures `data-test` as the test ID attribute. Scope repeated controls to the relevant product or container.
- Avoid positional selectors, brittle CSS/XPath, and fixed sleeps. If an accessible locator or test ID is unavailable, choose the most stable verified alternative and explain why.
- Keep page objects focused on typed locators and user actions. Put assertions in tests; reuse the fixtures in `fixtures/test.ts`, typed data in `tests/data/`, and existing reusable helpers in `utils/`.
- Obtain valid demo credentials through `tests/data/users.ts` and environment configuration; pass them to page-object actions. Keep intentionally invalid or blank values for negative tests and do not log passwords.
- Give each test an independent starting state using Playwright's test-scoped browser context. Do not rely on test ordering, shared mutable state, or another test's login/cart.
- Use strict TypeScript types and explicit, meaningful assertions on observable outcomes, navigation, and error states. Cover relevant success, validation, and boundary cases without weakening existing checks.
- Diagnose failures from the assertion, trace, screenshot, and logs when available. Fix the root cause; do not hide failures with broad catches, arbitrary retries, longer timeouts, or skipped tests.
- Run `npm run lint`, `npm run typecheck`, and the smallest relevant Chromium test, such as `npx playwright test auth.spec.ts --project=chromium`. Report commands and results, including any unverified behavior.
- Treat AI output as a suggestion: a human must review generated changes, locators, test data, assertions, and evidence. Never put private credentials in artifacts, source, prompts, or logs.
