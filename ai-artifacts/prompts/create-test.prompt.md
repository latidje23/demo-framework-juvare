---
description: "Create or extend an independent SauceDemo Playwright TypeScript test using the existing page objects and fixtures."
agent: "agent"
argument-hint: "Describe the user flow and expected outcomes"
---
# Create a Playwright test

Follow [Playwright guidelines](../instructions/playwright-typescript.instructions.md).

Use the user's request to identify the user flow, fresh starting state, expected success and error outcomes, and relevant data. If a necessary behavior is unclear, ask before inventing it. Inspect the application and existing coverage where practical.

1. Reuse typed fixtures, test data, and page objects; add or adjust page-object actions only where needed.
2. Select verified, resilient locators and write independent tests with specific observable assertions. Cover relevant negative and boundary cases.
3. Run `npm run lint`, `npm run typecheck`, and the smallest relevant Chromium test command. Report commands, results, page-object changes, and any unverified scenarios.
4. Flag the changes and evidence for human review; do not claim that AI output is automatically correct.
