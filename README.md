# Playwright Automation

This project contains browser and API automation examples written with JavaScript and [Playwright Test](https://playwright.dev/docs/intro). The tests exercise public training/demo sites; the project does not include an application server to start locally.

## Requirements

- Node.js 18 or newer
- npm
- Internet access to reach the demo sites used by the tests

## Set up locally

From the project directory:

```bash
npm ci
npx playwright install chromium
```

`npm ci` installs the locked project dependencies. The browser install downloads the Chromium version used by this Playwright project. On Linux, if the browser reports missing system packages, install them with:

```bash
npx playwright install --with-deps chromium
```

## Run tests

Run the Playwright test command:

```bash
npx playwright test
```

To list the tests Playwright discovers without running them:

```bash
npx playwright test --list
```

To run tests in debug mode with the Playwright Inspector:

```bash
npx playwright test --debug
```

There are no npm scripts configured in `package.json` yet, so use the `npx playwright` commands above.

### Current test-run behavior

At present, `tests/webAPiTest.spec.js` uses `test.only`, so a normal test run executes only that focused test rather than the other discovered tests. That test also calls `page.pause()`, which leaves the headed browser waiting for a manual resume. To run the complete suite unattended, remove the `.only` focus and the `page.pause()` debugging call, then run `npx playwright test` again.

The Playwright configuration uses Chromium, runs with the browser visible (`headless: false`), and produces an HTML report. It also captures screenshots and retains traces for failed tests.

## Review test results

After a test run completes, open the HTML report with:

```bash
npx playwright show-report
```

Playwright writes test artifacts, including screenshots and failure traces, under `test-results/`. To inspect a trace archive:

```bash
npx playwright show-trace path/to/trace.zip
```

## What is covered

The automated examples in `tests/` cover:

- Basic UI interactions and login validation (`uiBasics.spec.js`)
- Checkboxes, radio buttons, and handling a new browser tab (`checkBoxesRadioBtns.spec.js`)
- Form controls and locators (`specialLocators.spec.js`)
- Dialogs, hover behavior, hidden elements, and frames (`moreValidations.spec.js`)
- Shopping-cart checkout and order verification (`clientApp.spec.js`)
- API login/order creation followed by UI order verification (`webAPiTest.spec.js`)

The file `tests/What you are testing: Create a brand new` is an assignment brief for an event-booking scenario, not an executable Playwright test.

## External sites and credentials

Tests depend on third-party training sites and APIs, so they require an internet connection and may be affected by those services changing or being unavailable. Some tests create orders in the demo storefront.

The current tests include demo-account credentials directly in their source. Review and replace those values with credentials you are authorized to use before running the related tests or sharing the project. Do not commit personal credentials or other secrets to the repository.
