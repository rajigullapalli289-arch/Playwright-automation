// const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
// const { poManager } = require('../../pageObjects/poManager');
const creds = require('../../utils/env');

// setDefaultTimeout(60_000); // default timeout for all steps or use individual step timeouts with {timeout: 10_000}

Given('I am on the ecommerce website, login with valid credentials', async function () {
    this.po = this.poManager;
    this.NavigateButtonsInstance = this.po.getNavigateButtons();
    await this.NavigateButtonsInstance.gotoUrl();
    const login = this.po.getLoginPage();
    await login.login(creds.email, creds.clientPassword);
    await login.waitForPageLoad();
});

When('I Add an item to the cart', async function () {
    this.dashboard = this.po.getDashboardPage();
    this.productName = 'ADIDAS ORIGINAL';
    await this.dashboard.addProductToCart(this.productName);
    await this.NavigateButtonsInstance.clickCartButton();
});

Then('I should see the item in the cart', async function () {
   this.myCart = this.po.getMyCartPage();

    // Verify the selected item is in the cart, then proceed to checkout.
    await this.myCart.purchaseItem(this.productName);
});

When('I proceed to checkout and place the order', async function () {
    this.payment = this.po.getPaymentsPage();
    await this.payment.fillPaymentDetails();
    await this.payment.verifyEmail(creds.email);

    await this.payment.submitOrder();
});


Then('I should see the order confirmation message and should see the order details in Order History page', async function () {
    this.orderConfirmation = this.po.getOrderConfirmationPage();
    await this.orderConfirmation.verifyOrderConfirmation();
    const orderId = await this.orderConfirmation.getOrderId();

    this.ordersPageInstance = this.po.getOrdersPage();
    await this.NavigateButtonsInstance.openOrders();
    await this.ordersPageInstance.viewOrder(orderId);

    await this.ordersPageInstance.verifyOrderDetails(orderId);
});


Given('I am on the saucedemo website', async function () {
  // Write code here that turns the phrase above into concrete actions
   await this.page.goto('https://www.saucedemo.com');
});

When('I attempt to login with credentials {string} and {string}', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
  await this.page.locator("#user-name").fill(username);
  await this.page.locator("#password").fill(password);
  await this.page.locator("#login-button").click();
});

Then('I should see an error message indicating invalid credentials {string}',{timeout: 50000}, async function (errorMessage) {
  // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[data-test='error']").textContent());
    await expect(this.page.locator("[data-test='error']")).toContainText(errorMessage);
});
