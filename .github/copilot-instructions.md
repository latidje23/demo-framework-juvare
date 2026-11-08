---
description: "Top-level guidance for GitHub Copilot / AI assistants working in this repository."
applyTo: "*"
---

# copilot-instructions

Welcome to the **demo-juvare** repository. This is a Playwright + TypeScript testing project (SauceDemo). All AI-related guidance lives under `.github/`.

## Where to Look

- **`.github/instructions/coding-standards.instructions.md`** — Playwright / POM testing conventions (the primary guidance; follow for all test work).
- **`.github/instructions/agent-rules.instructions.md`** — cross-cutting rules all agents must follow (verify, do not invent).
- **`.github/instructions/approval-rules.instructions.md`** — when human approval is required and what evidence to provide.
- **`.github/agents/`** — role-specific agents:
  - `playwright-test-planner.agent.md` — plan comprehensive test scenarios.
  - `playwright-test-generator.agent.md` — generate Playwright tests against the live app.
  - `playwright-test-healer.agent.md` — debug and fix failing tests.
- **`.github/prompts/`** — reusable prompt templates: `/create-test`, `/diagnose-failure`.
- **`.github/skills/`** — specialized skills: `playwright/` (test maintenance), `reporting/` (test reports).
- **`.github/workflows/`** — CI/CD: `playwright.yml` (full suite), `smoke-ci.yml` (fast smoke).

## Rules of Thumb

1. Start from `coding-standards.instructions.md` before writing or modifying tests.
2. Page Object Model is mandatory; keep assertions in tests, locators in page objects.
3. Verify behavior against the app/UI/evidence; never invent selectors or expected values.
4. Report commands actually run and their outcomes; do not claim passes that were not verified.
5. Flag changes for human review per `approval-rules.instructions.md`.
