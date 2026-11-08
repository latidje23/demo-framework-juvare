---
name: playwright-test-maintenance
description: "Use when creating, updating, or debugging SauceDemo Playwright TypeScript tests and page objects."
---

# Playwright test maintenance

Follow the [project guidelines](../../instructions/coding-standards.instructions.md).

## Page Object Model (POM) Pattern - MANDATORY

1. **Inspect the Page Object Structure**:
   - Check if a page object exists for the UI area being tested (e.g., `FooterPage`, `LoginPage`)
   - If not, create a new page object class extending `BasePage` in `pages/` directory
   - Register the page object as a fixture in `fixtures/test.ts`

2. **Use Fixture Injection in Tests**:
   - Import test from `../fixtures/test` (NOT from `@playwright/test`)
   - Request page objects as fixture parameters
   - Never use `page.goto()`, `page.getByTestId()`, or raw locators in test code
   - Example: `test('name', async ({ loginPage, inventoryPage }) => { ... })`

3. **Define Locators in Page Objects**:
   - Create readonly Locator properties for each UI element
   - Encapsulate complex locator logic (filtering, scoping) in the page object
   - Example: `readonly xLink = page.locator('a').filter({ hasText: 'X' })`

4. **Create Methods for User Actions**:
   - Define typed methods for user interactions in page objects
   - Example: `async login(username: string, password: string): Promise<void>`
   - Pass credentials and parameters to methods

5. **Keep Assertions in Tests**:
   - Use page object locators with `expect()` in test code
   - Do NOT put assertions in page objects
   - Example: `await expect(footerPage.xLink).toHaveAttribute('href', 'https://x.com/saucelabs')`

## Workflow

1. Inspect the requested flow, existing tests, page objects, fixtures, and data. For failures, gather the assertion and available trace, screenshot, and logs.
2. Identify the expected behavior and root cause or coverage gap. Ask for clarification if a necessary requirement or evidence is missing.
3. Make the smallest appropriate change using verified locators, isolated tests, typed data, and meaningful assertions. **Ensure all tests follow the POM pattern with fixture injection**. Do not mask errors or weaken checks.
4. Run `npm run lint`, `npm run typecheck`, and the smallest relevant Chromium test. If behavior is unclear or a check fails, investigate and report it rather than claiming success.
5. Summarize changed files, commands and results, unresolved risks, and the human review needed.
