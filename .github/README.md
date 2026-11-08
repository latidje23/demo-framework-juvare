# .github Directory

This directory contains GitHub-specific configuration, CI/CD workflows, **and the single source of truth for all AI guidance** in this repository.

## Contents

- **workflows/** - GitHub Actions workflows for CI/CD
  - `playwright.yml` - Full Playwright Chromium suite (push/PR)
  - `smoke-ci.yml` - Fast smoke suite
- **agents/** - Role-specific AI agents
  - `playwright-test-planner.agent.md` - Test planning
  - `playwright-test-generator.agent.md` - Test generation
  - `playwright-test-healer.agent.md` - Failure diagnosis & fix
- **instructions/** - AI coding standards and rules
  - `coding-standards.instructions.md` - Playwright / POM conventions (primary)
  - `agent-rules.instructions.md` - Cross-cutting agent rules
  - `approval-rules.instructions.md` - When human approval is required
- **prompts/** - Reusable prompt templates
  - `create-test.prompt.md` - `/create-test`
  - `diagnose-failure.prompt.md` - `/diagnose-failure`
- **skills/** - Automated workflows
  - `playwright/Skill.md` - Test maintenance
  - `reporting/Skill.md` - Test reporting
- **copilot-instructions.md** - Top-level guidance for Copilot / AI assistants

## Single Source of Truth

All AI-related instructions, prompts, and skills live **here** under `.github/`.
Refer to [copilot-instructions.md](./copilot-instructions.md) as the entrypoint and
[coding-standards.instructions.md](./instructions/coding-standards.instructions.md) for test conventions.

## Contributing

When adding new workflows, agents, instructions, prompts, or skills, place them in the
appropriate subdirectory under `.github/` and keep each artifact in one place only.

