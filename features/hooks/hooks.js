
const { Before, After, AfterStep, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { poManager } = require('../../pageObjects/poManager');

setDefaultTimeout(60_000);

Before(async function () {
    this.browser = await chromium.launch({ headless: !!process.env.CI });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new poManager(this.page);
});

After(async function () {
    if (this.context) {
        await this.context.close();
    }
    if (this.browser) {
        await this.browser.close();
    }
});

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED && this.page) {
        await this.page.screenshot({
            path: `test-results/cucumber/screenshots/screenshot-${Date.now()}.png`,
        });
    }
});