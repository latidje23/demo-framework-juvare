# SauceDemo Playwright Framework

Playwright Test and TypeScript framework for the [SauceDemo](https://www.saucedemo.com/) application. Includes page objects, test-scoped fixtures, and AI-assisted development support with VS Code Copilot.

## Quick Start (5 minutes)

```powershell
npm ci
npx playwright install chromium
Copy-Item .env.example .env
npm run test:chromium
npm run test:report
```

## Prerequisites

- **Node.js:** 22.18+ (22.x) or 24.11+ (24.x)
- **npm:** Latest version
- **Internet:** Download dependencies, browsers, and reach SauceDemo

### Installation

```powershell
npm ci
npx playwright install chromium
```

On Linux, use `npx playwright install --with-deps chromium` for system dependencies.

## Environment Configuration

1. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Edit `.env` with your credentials:
   - `BASE_URL` - Target application URL (defaults to `https://www.saucedemo.com/`)
   - `STANDARD_USER`, `LOCKED_OUT_USER`, `PROBLEM_USER`, etc. - Demo account usernames
   - `SAUCEDEMO_PASSWORD` - Shared password for all accounts

3. Environment variables override `.env` values (useful for CI)

⚠️ **Security:** Never commit credentials to `.env.example` or logs.

## Running Tests

| Command | Purpose |
|---------|---------|
| `npm test` | Run all browsers (currently Chromium) |
| `npm run test:chromium` | Run Chromium only |
| `npm run test:chromium -- auth.spec.ts` | Run specific test |
| `npm run test:headed` | Show browser window |
| `npm run test:report` | Open HTML report |
| `npm run typecheck` | Type-check project |
| `npm run lint` | Lint TypeScript files |

**Examples:**
```powershell
npm run test:chromium -- auth.spec.ts -g "login"  # Run tests matching pattern
npm run test:chromium -- --workers=4              # Parallel execution
npm run test:headed                               # Watch tests in browser
```

## Project Structure

```text
pages/                     Page Object Model classes
fixtures/                  Test-scoped page object fixtures
tests/                     Test suites
  ├── auth.spec.ts        Login and authentication
  ├── inventory.spec.ts    Product listing and filtering
  ├── cart.spec.ts         Shopping cart operations
  ├── checkout.spec.ts     Purchase flow
  └── data/               Test data (users, checkout info)
utils/                     Configuration helpers (environment loading)
ai-artifacts/              AI development guidance (single source of truth)
.github/                   GitHub Actions workflows
playwright.config.ts       Playwright configuration (Chromium, reporters)
.env.example              Safe credential template
```

**Key Concepts:**

- **Page Objects:** Encapsulate UI selectors and user actions (in `pages/`). Tests use `expect()` for assertions.
- **Fixtures:** Provide isolated, type-safe test context. Import from `fixtures/test.ts`.
- **Selectors:** Use accessible roles/labels (`getByRole`, `getByLabel`) with `data-test` fallback.

## Reports & Debugging

After tests run, view results:

```powershell
npm run test:report
```

**Report includes:**
- Test status and duration
- Screenshots (on failure)
- Videos (on failure)
- Traces (on first retry)

**Traces:** Open saved traces for detailed automation replay:
```powershell
npx playwright show-trace "path\to\trace.zip"
```

**Common Issues:**
- Tests timeout: Check network and selectors in DevTools
- Chromium won't launch: Run `npx playwright install --with-deps chromium` (Linux: includes system dependencies)
- BASE_URL error: Ensure `.env` has a valid absolute URL (e.g., `https://www.saucedemo.com/`)

## AI-Assisted Development

All AI guidance is in **`ai-artifacts/`** (single source of truth):

- **Instructions:** `ai-artifacts/instructions/playwright-typescript.instructions.md` — Coding standards
- **Prompts:** `ai-artifacts/prompts/` — `/create-test`, `/diagnose-failure` commands
- **Skills:** `ai-artifacts/skills/` — VS Code Copilot workflows

In VS Code Copilot chat, use `/` to access prompts and skills. See [ai-artifacts/README.md](./ai-artifacts/README.md) for details.

## Continuous Integration

`.github/workflows/playwright.yml` runs on pushes and PRs to `main`/`master`:

- Installs locked dependencies
- Downloads Chromium and Linux system dependencies
- Runs type-check, lint, and Chromium suite
- Uploads HTML report (30-day retention on failure)

Environment variables override `.env` values.

## Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) — Contributing guidelines and development workflows
- [ai-artifacts/README.md](./ai-artifacts/README.md) — AI artifacts structure and usage
- [.github/README.md](./.github/README.md) — GitHub-specific configuration

## 👨‍🏫 Author

<div>
  <h3><strong>Salah Tei</strong></h3>
  <p><em><strong>QA Lead/SDET</strong></em></p>
  <table>
    <tbody>
      <tr>
        <td>▶️ <strong>LinkedIn</strong></td>
        <td><a href="https://www.linkedin.com/in/salah-tei23000/">https://www.linkedin.com/in/salah-tei23000/</a></td>
      </tr>
    </tbody>
  </table>
</div>

