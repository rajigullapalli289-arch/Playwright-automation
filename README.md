# Playwright Automation

JavaScript browser and API automation examples using [Playwright Test](https://playwright.dev/docs/intro). Tests exercise external training/demo sites; this repository does not include an application server to start.

## Requirements

- Node.js 18 or newer and npm
- Internet access to reach the demo sites
- Demo-site account credentials for tests that require login

## Local setup

From the project directory, install dependencies and the Chromium browser used by the Playwright configuration:

```bash
npm ci
npx playwright install chromium
```

Tests that log in read credentials from a `.env` file in the project root. Create it with accounts you are authorized to use:

```dotenv
APP_EMAIL=your-demo-account-email
CLIENT_PASSWORD=your-client-site-password
EVENTHUB_PASSWORD=your-eventhub-password
```

`.env` is ignored by Git; do not commit credentials. Tests that don’t use these accounts may not need all three values.

## Run tests

The `npm test` script runs only `webAPiTest.spec.js`:

```bash
npm test
```

To run the full suite:

```bash
npx playwright test
```

Other useful commands:

```bash
npx playwright test --list                    # List discovered tests
npx playwright test tests/uploadDownload.spec.js  # Run one spec
npx playwright test --debug                   # Run with the Playwright Inspector
```

The configuration runs Chromium in a visible browser window, captures screenshots, and retains traces for failed tests. The tests interact with external demo sites and may create orders or events; results depend on those sites and the account state.

## Review results

Playwright writes reports and test artifacts to `playwright-report/` and `test-results/`. After a run, open the HTML report with:

```bash
npx playwright show-report
```

To inspect a trace archive:

```bash
npx playwright show-trace path/to/trace.zip
```

## Test coverage

The specs cover UI interactions and forms, event creation and refund eligibility, API login/order verification, network routing, browser storage and fixtures, and Excel download/edit/upload.
