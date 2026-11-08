# Contributing to demo-juvare

Thank you for your interest in contributing! This guide explains how to contribute to this Playwright TypeScript project.

## Project Structure

### Single Source of Truth: `.github/`

All project AI guidance is centralized under **`.github/`**:

```
.github/
├── instructions/
│   ├── coding-standards.instructions.md     ← Coding standards (POM conventions)
│   ├── agent-rules.instructions.md          ← Cross-cutting agent rules
│   └── approval-rules.instructions.md       ← When human approval is required
├── prompts/
│   ├── create-test.prompt.md                ← Create/extend tests
│   └── diagnose-failure.prompt.md           ← Debug failures
├── agents/
│   ├── playwright-test-planner.agent.md     ← Test planning
│   ├── playwright-test-generator.agent.md   ← Test generation
│   └── playwright-test-healer.agent.md      ← Failure diagnosis
├── skills/
│   ├── playwright/Skill.md                  ← Playwright maintenance workflow
│   └── reporting/Skill.md                   ← Test reporting workflow
├── workflows/                               ← CI/CD automation
├── copilot-instructions.md                  ← Copilot entrypoint
└── README.md                                ← Directory purpose explanation
```

**Key Principle**: All instructions, prompts, and skills are maintained in **one place only**. There are no duplicate files elsewhere.

## Contributing New Features

### Step 1: Read the Guidelines

Start by reading the canonical guidance:

- **For test development**: `.github/instructions/coding-standards.instructions.md`
- **To create a new test**: Use `.github/prompts/create-test.prompt.md`
- **To debug a failure**: Use `.github/prompts/diagnose-failure.prompt.md`

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
3. Invoke the **playwright** skill (or **reporting** skill) for specialized workflows

Type `/` in the Copilot chat to see available prompts and skills. If discovery isn't working, manually reference the files in `.github/prompts/` and `.github/skills/`.

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

Add to **`.github/instructions/`** only:

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

Add to **`.github/prompts/`** only:

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

Add to **`.github/skills/<name>/Skill.md`** and follow VS Code Copilot skill conventions.

### New Agent

Add to **`.github/agents/<name>.agent.md`** following the existing agent frontmatter (name, description, tools, model, mcp-servers).

## Important: Don't Duplicate

- ✅ **Do** add all instructions, prompts, skills, and agents under `.github/` only
- ❌ **Don't** create parallel copies elsewhere (e.g., an `ai-artifacts/` directory or a second prompts folder)

Keep each artifact in **one place only** under `.github/`.

## Removed `ai-artifacts/`

Earlier, AI guidance lived in a separate `ai-artifacts/` directory. To have a single, discoverable location, all of its content was consolidated under `.github/` and `ai-artifacts/` was deleted.

As of the latest consolidation:

- ✅ All guidance (instructions, prompts, skills, agents) is under `.github/` only
- ✅ `ai-artifacts/` has been removed
- ✅ README files document the structure
- ✅ All tools, tests, and linting pass

This ensures consistency and makes the project easier to maintain.

## Questions?

Refer to:
- `.github/README.md` - AI guidance structure and usage
- `.github/copilot-instructions.md` - Copilot / AI assistant entrypoint
- `README.md` - Project overview and setup instructions
