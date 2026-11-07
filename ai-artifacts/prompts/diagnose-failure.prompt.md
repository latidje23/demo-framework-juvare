---
description: "Diagnose and fix a failing SauceDemo Playwright test using assertion and trace evidence."
agent: "agent"
argument-hint: "Provide the failing test, assertion, and available trace or logs"
---
# Diagnose a Playwright failure

Follow [Playwright guidelines](../instructions/playwright-typescript.instructions.md).

Identify the failing test and assertion, expected and actual behavior, reproduction command, and available trace, screenshot, or log evidence. Request missing information if it is needed to distinguish causes. Inspect the relevant test, fixture, page object, and UI before deciding on a fix.

Explain the evidence and root cause, make the smallest safe change, and rerun the failing test, lint, and type-check. Do not weaken assertions, hide exceptions, add arbitrary waits, or assume the application is at fault. Report commands and results, any remaining uncertainty, and what a human reviewer should verify.
