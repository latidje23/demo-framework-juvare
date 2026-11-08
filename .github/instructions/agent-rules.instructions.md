---
description: "Cross-cutting rules for AI agents working in this repository."
applyTo: "*"
---

# Agent Rules

These rules apply to all AI-assisted work in this repository, regardless of the specific agent or task.

## Verify, Do Not Invent

- Inspect the current project (tests, page objects, fixtures, test data, config, APIs, UI) before acting.
- Treat documentation examples as illustrative, not authoritative. Verify against the actual project.
- Never invent selectors, behavior, expected values, or application features. If evidence is missing or requirements are ambiguous, state the limitation and ask for clarification.

## Follow Project Conventions

- **Page Object Model (POM) is mandatory.** See [coding-standards.instructions.md](./coding-standards.instructions.md).
- Reuse existing page objects, fixtures, and helpers before creating new ones.
- Keep assertions in tests; page objects hold locators and action methods only.

## Integrity of Reported Results

- Report the commands actually run and their outcomes. Never claim a test passed if it was not run or did not complete.
- Distinguish observed facts from assumptions and unverified conclusions.
- Make the smallest safe fix. Do not weaken assertions, hide exceptions, or add arbitrary waits.

## Hygiene

- Do not leave `test.only()` in committed code.
- Run `npm run lint` and `npm run typecheck` before finishing.
- Flag changes for human review per [approval-rules.instructions.md](./approval-rules.instructions.md).
