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

- **Node.js:** 24 LTS or newer (recommended: 26.x)
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
npm run test:chromium -- footer.spec.ts           # Run a specific spec file
npm run test:chromium -- --workers=4              # Parallel execution
npm run test:headed                               # Watch tests in browser
npm run test:chromium -- test-setup/config-validation.spec.ts  # Run config validation spec
```

## Project Structure

```text
pages/                     Page Object Model classes
fixtures/                  Test-scoped page object fixtures
tests/                     Test suites
  ├── auth.spec.ts             Login and authentication
  ├── inventory.spec.ts        Product listing, sorting, and filtering
  ├── cart.spec.ts             Shopping cart operations
  ├── checkout.spec.ts         Purchase flow
  ├── footer.spec.ts           Footer links and legal text
  ├── home-page.spec.ts        Home page opens at the configured base URL
  ├── page-objects.spec.ts     Page object / fixture integration workflows
  ├── product-price-filter.spec.ts  Price (high to low) sorting verification
  ├── sauceLab.spec.ts         About sidebar navigation
  ├── example.spec.ts          Playwright starter template (not SauceDemo)
  ├── seed.spec.ts             Placeholder/test template
  └── data/                    Test data
      ├── users.ts             Demo account credentials
      └── checkout.ts          Checkout info + sample product data
utils/                     Configuration helpers (environment loading)
test-setup/                Startup / configuration validation specs
specs/                     Test plans (README only)
.vscode/                   Editor settings (workspace, Playwright MCP)
.github/                   AI guidance (single source of truth) + GitHub Actions workflows
│ ├── agents/             Role-specific AI agents (planner, generator, healer)
│ ├── instructions/       Coding standards, agent rules, approval rules
│ ├── prompts/            /create-test, /diagnose-failure templates
│ ├── skills/             playwright/ and reporting/ skills
│ ├── workflows/          CI (playwright.yml, smoke-ci.yml)
│ └── copilot-instructions.md
playwright.config.ts       Playwright configuration (Chromium, reporters)
.env.example              Safe credential template
tsconfig.json             TypeScript configuration
eslint.config.mjs         ESLint flat configuration
package.json              Projects scripts, dependencies, and Node engine
```
> **Note:** `playwright.config.ts` sets `testDir` to `./tests`, so `npm test`, `npm run test:chromium`, and the CI workflows run specs under `tests/` only. The `test-setup/` validation spec requires an explicit path (e.g., `npm run test:chromium -- test-setup/config-validation.spec.ts`).

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

All AI guidance is in **`.github/`** (single source of truth):

- **Instructions:** `.github/instructions/coding-standards.instructions.md` — Coding standards
- **Prompts:** `.github/prompts/` — `/create-test`, `/diagnose-failure` commands
- **Skills:** `.github/skills/` — VS Code Copilot workflows
- **Agents:** `.github/agents/` — Role-specific Playwright agents

In VS Code Copilot chat, use `/` to access prompts and skills. See [.github/README.md](./.github/README.md) and [.github/copilot-instructions.md](./.github/copilot-instructions.md) for details.

## Continuous Integration

`.github/workflows/playwright.yml` runs on pushes and PRs to `main`/`master`:

- Installs locked dependencies
- Downloads Chromium and Linux system dependencies
- Runs type-check, lint, and Chromium suite
- Uploads HTML report (30-day retention on failure)

`.github/workflows/smoke-ci.yml` runs a fast `auth` smoke set on the same push/PR gates.

Environment variables override `.env` values.

## Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) — Contributing guidelines and development workflows
- [.github/README.md](./.github/README.md) — AI guidance and GitHub-specific configuration

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

