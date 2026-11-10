const { test } = require("@playwright/test");
const creds = require('../utils/env');
const { poManager } = require('../pageObjects/poManager');
const testData = require('../utils/testData.json');
const { test: testWithFixtures } = require('../utils/testDataFixture');


// Test each product from the test data file
for (const product of testData.products) {
test(`Purchase item ${product.productName}`, async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = creds.email
    const password = creds.clientPassword;

    const po = new poManager(page);
    const navigateButtonsInstance = po.getNavigateButtons();
    await navigateButtonsInstance.gotoUrl();
    const login = po.getLoginPage();
    await login.login(email, password);
    await login.waitForPageLoad();
    const dashboard = po.getDashboardPage();
    await dashboard.addProductToCart(product.productName);

    await navigateButtonsInstance.clickCartButton();

    const myCart = po.getMyCartPage();

    // Verify the selected item is in the cart, then proceed to checkout.
    await myCart.purchaseItem(product.productName);
});

}

// test with fixtures
testWithFixtures('Purchase item' , async ({browser, products})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = creds.email
    const password = creds.clientPassword;

    const po = new poManager(page);
    const navigateButtonsInstance = po.getNavigateButtons();
    await navigateButtonsInstance.gotoUrl();
    const login = po.getLoginPage();
    await login.login(email, password);
    await login.waitForPageLoad();
    const dashboard = po.getDashboardPage();
    await dashboard.addProductToCart(products.productName);

    await navigateButtonsInstance.clickCartButton();

    const myCart = po.getMyCartPage();

    // Verify the selected item is in the cart, then proceed to checkout.
    await myCart.purchaseItem(products.productName);
});