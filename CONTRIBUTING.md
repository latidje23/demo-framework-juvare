# Contributing to demo-juvare

Thank you for your interest in contributing! This guide explains how to contribute to this Playwright TypeScript project.

## Project Structure

### Single Source of Truth: `ai-artifacts/`

All project guidance is centralized in the **`ai-artifacts/`** directory:

```
ai-artifacts/
├── instructions/
│   └── playwright-typescript.instructions.md     ← Coding standards
├── prompts/
│   ├── create-test.prompt.md                     ← Create/extend tests
│   └── diagnose-failure.prompt.md                ← Debug failures
└── skills/
    └── playwright-test-maintenance/
        └── SKILL.md                              ← Maintenance workflow
```

**Key Principle**: All instructions, prompts, and skills are maintained in **one place only**. There are no duplicate files elsewhere.

### GitHub-Specific Configuration: `.github/`

The `.github/` directory contains only GitHub Actions workflows and GitHub-specific configurations:

```
.github/
├── workflows/                                    ← CI/CD automation
├── agents/                                       ← GitHub action agents
├── skills/                                       ← GitHub integration skills
└── README.md                                     ← Directory purpose explanation
```

## Contributing New Features

### Step 1: Read the Guidelines

Start by reading the canonical guidance:

- **For test development**: `ai-artifacts/instructions/playwright-typescript.instructions.md`
- **To create a new test**: Use `ai-artifacts/prompts/create-test.prompt.md`
- **To debug a failure**: Use `ai-artifacts/prompts/diagnose-failure.prompt.md`

### Step 2: Follow Existing Patterns

This project uses:

- **Page Object Model (POM)** for UI interaction abstraction
- **Test-scoped fixtures** for isolated test context
- **Accessible selectors** (roles, labels) with fallback to `data-test` attributes
- **Playwright-native conventions** for assertions and waits

Examples are in the `pages/`, `fixtures/`, and `tests/` directories.

### Step 3: Get AI Assistance (Optional)

In VS Code Copilot chat, you can:

1. Use the **/create-test** prompt to generate new test code
2. Use the **/diagnose-failure** prompt to fix failing tests
3. Invoke the **playwright-test-maintenance** skill for complex workflows

Type `/` in the Copilot chat to see available prompts and skills. If discovery isn't working, manually reference the files in `ai-artifacts/`.

### Step 4: Validate Your Changes

Before submitting changes:

```powershell
# Type-check
npm run typecheck

# Lint
npm run lint

# Run tests (focused on your changes)
npm run test:chromium -- your-test.spec.ts

# View report
npm run test:report
```

## Adding Project Guidance

### New Instruction

Add to **`ai-artifacts/instructions/`** only (not to `.github/`):

```markdown
---
description: "Brief description of what this applies to"
applyTo: "files/**/*.ts"
---

# My Instruction Title

## Guidelines

- Point 1
- Point 2
```

### New Prompt

Add to **`ai-artifacts/prompts/`** only (not to `.github/`):

```markdown
---
description: "What this prompt helps with"
agent: "agent"
argument-hint: "What the user should provide"
---

# Prompt Title

## Context

Provide context about the task...

## Instructions

Guide the AI on what to do...

## Example

Show an example input and expected output...
```

### New Skill

Add to **`ai-artifacts/skills/`** and follow VS Code Copilot skill conventions.

## Important: Don't Duplicate

- ❌ **Don't** add instructions to `.github/instructions/`
- ❌ **Don't** add prompts to `.github/prompts/`
- ✅ **Do** add everything to `ai-artifacts/` only

The `.github/` directory is reserved for GitHub-specific configuration.

## Consolidation History

Previously, instructions and prompts were duplicated in both `.github/` and `ai-artifacts/`, which caused:

- Multiple maintenance points
- Risk of inconsistency (e.g., POM updates in one location but not the other)
- Confusion about the authoritative version

As of the latest consolidation:

- ✅ All duplicates were removed from `.github/`
- ✅ All guidance is now in `ai-artifacts/` only
- ✅ README files document the structure
- ✅ All tools, tests, and linting pass

This ensures consistency and makes the project easier to maintain.

## Questions?

Refer to:
- `ai-artifacts/README.md` - Structure and usage guide
- `.github/README.md` - GitHub-specific configuration explanation
- `README.md` - Project overview and setup instructions
