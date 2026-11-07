# AI Artifacts - Single Source of Truth

This directory contains all AI-related project guidance, instructions, and prompts.

## Directory Structure

```
ai-artifacts/
├── instructions/          - Coding standards and project guidelines
│   └── playwright-typescript.instructions.md
│
├── prompts/              - Structured prompts for AI assistants
│   ├── create-test.prompt.md
│   └── diagnose-failure.prompt.md
│
└── skills/               - VS Code Copilot skill definitions
    └── playwright-test-maintenance/
        └── SKILL.md
```

## Usage

### For Developers
- Refer to `instructions/` for coding guidelines and standards
- Reference `prompts/` when asking AI assistants for help with specific tasks
- Check `skills/` for VS Code Copilot configuration

### For AI Assistants
- Follow the instructions in `instructions/` for all project work
- Use prompts in `prompts/` as templates for structured requests
- Reference skills in `skills/` for task-specific guidance

## Contributing

When adding new instructions or prompts:

1. **Add to `ai-artifacts/`** - This is the single source of truth
2. **Create with metadata** - Include YAML frontmatter with:
   - `description` - Brief description of the instruction/prompt
   - `applyTo` (for instructions) - File patterns this applies to
   - `agent` (for prompts) - Type of agent (e.g., "agent", "general-purpose")
3. **Use relative paths** - Link between files using relative paths within this directory

Example:
```markdown
---
description: "Guidelines for Playwright TypeScript development"
applyTo: "tests/**/*.ts,pages/**/*.ts"
---

# Playwright Guidelines
...
```

## Maintenance Notes

- All updates to instructions, prompts, or skills should be made **only** in this directory
- This is the **canonical location** referenced by:
  - VS Code Copilot
  - Developer documentation
  - AI assistants
  - Project workflows

### Single Source of Truth Principle
Each instruction or prompt exists in **one place only**. No duplicates across other directories.
