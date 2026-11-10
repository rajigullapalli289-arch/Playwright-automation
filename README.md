# Playwright Automation

JavaScript UI and API automation examples using [Playwright Test](https://playwright.dev/docs/intro). Tests run against external training/demo sites; there is no local application server to start.

## Setup

Requirements: Node.js 18+ and npm.

```bash
npm ci
npx playwright install chromium webkit
cp .env.example .env
```

Fill in `.env` with demo account credentials you are authorized to use:

```dotenv
APP_EMAIL=your-demo-account-email
CLIENT_PASSWORD=your-client-site-password
EVENTHUB_PASSWORD=your-eventhub-password
```

Do not commit `.env` or credentials. Some tests create orders or events on the demo sites.

## Run tests

```bash
npm test                                      # Run all tests in Chromium and WebKit
npx playwright test --project=chromium        # Run Chromium only
npx playwright test --project=webkit          # Run WebKit only
npx playwright test tests/uploadDownload.spec.js  # Run one spec
npx playwright test --debug                   # Debug with Playwright Inspector
```

Local Chromium runs with a visible browser; WebKit runs headlessly. GitHub Actions runs the Chromium project only.

## Review results

Playwright saves the HTML report to `playwright-report/` and test artifacts to `test-results/`.

```bash
npx playwright show-report
npx playwright show-trace path/to/trace.zip
```

The tests cover UI forms and interactions, checkout, event booking/refunds, API calls, network routing, browser storage, fixtures, and Excel download/upload.
