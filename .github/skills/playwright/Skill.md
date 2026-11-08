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
   - Never use `page.goto()`, `page.getByTestId()`, or raw locators directly in test code — delegate to page-object methods and locators.
   - Example: `test('name', async ({ loginPage, inventoryPage }) => { ... })`

3. **Define Resilient Locators in Page Objects**:
   - Create readonly Locator properties for each UI element
   - Encapsulate complex locator logic (filtering, scoping) in the page object
   - **Prioritize resilient locator strategies over brittle CSS/tag selectors.** Use, in order of preference:
     1. `getByTestId()` backed by `data-test` attributes — e.g. `page.getByTestId('inventory-item')`
     2. Accessible roles with `getByRole()` — e.g. `page.getByRole('button', { name: 'Checkout' })`
     3. `getByLabel()`, `getByPlaceholder()`, or `getByText()` where a semantic handle exists
   - Avoid `page.locator()` with raw tag/CSS selectors (e.g. `page.locator('a')`), CSS classes, or XPath unless no resilient alternative exists. When unavoidable, scope and filter narrowly rather than selecting broadly (e.g. `page.getByRole('contentinfo').getByRole('link', { name: 'X' })`).
   - Example: `readonly xLink = page.getByRole('link', { name: 'X' })`

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
