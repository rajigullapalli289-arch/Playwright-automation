const { test } = require("@playwright/test");
const creds = require('../utils/env');
const { poManager } = require('../pageObjects/poManager');

test('Purchase item', async ({browser})=> 
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
    const productName = 'ADIDAS ORIGINAL';
    await dashboard.addProductToCart(productName);

    await navigateButtonsInstance.clickCartButton();

    const myCart = po.getMyCartPage();

    // Verify the selected item is in the cart, then proceed to checkout.
    await myCart.purchaseItem(productName);

    const payment = po.getPaymentsPage();
    await payment.fillPaymentDetails();
    await payment.verifyEmail(email);
    await payment.submitOrder();

    const orderConfirmation = po.getOrderConfirmationPage();
    await orderConfirmation.verifyOrderConfirmation();
    const orderId = await orderConfirmation.getOrderId();

    const ordersPageInstance = po.getOrdersPage();
    await navigateButtonsInstance.openOrders();
    await ordersPageInstance.viewOrder(orderId);

    await ordersPageInstance.verifyOrderDetails(orderId);
});
