---
description: "Rules for when human approval is required and what evidence must accompany a proposed change."
applyTo: "*"
---

# Approval Rules

Guidelines for when changes require human review before they are merged or accepted.

## When Human Approval Is Required

- **Deleting or renaming files** in the source tree (`tests/`, `pages/`, `fixtures/`, `utils/`).
- **Changing test behavior or weakening assertions** (e.g., replacing an assertion with a softer check, `test.fixme()`, or `test.skip()`).
- **Adding dependencies** or changing `package.json` / `package-lock.json`.
- **Altering CI workflows** (`.github/workflows/*.yml`), the Playwright config, or environment handling.
- **Committing generated or scaffolded code** (e.g., recorder output) without refactoring it to project conventions.
- **Any change where the AI agent cannot verify the outcome directly.**

## Evidence That Must Accompany a Proposed Change

1. The exact commands run (e.g., `npm run lint`, `npm run typecheck`, the specific test command).
2. The results of those commands — pass/fail, counts, and any skipped or blocked items.
3. The root cause or justification for the change.
4. Any remaining uncertainty or unverified assumptions.
5. What a human reviewer should verify manually.

## Do Not

- **Self-approve** substantial changes without flagging them for review.
- Claim a change is verified if the relevant command was not run or did not complete.
- Hide failures, weaken checks, or add arbitrary waits to make tests pass.
- Leave `test.only()` or debugging artifacts in committed code.
