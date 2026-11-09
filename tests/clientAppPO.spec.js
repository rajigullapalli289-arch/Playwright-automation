const {test,expect} = require("@playwright/test")
const { navigateButtons } = require('../pageObjects/navigateButtons');
const creds = require('./utils/env');
const { loginPage } = require('../pageObjects/loginPage');
const { dashboardPage } = require('../pageObjects/dashboardPage');
const { myCartPage } = require('../pageObjects/myCartPage');
const { paymentsPage } = require('../pageObjects/paymentsPage');
const { orderConfirmationPage } = require('../pageObjects/orderConfirmationPage');
const { ordersPage } = require('../pageObjects/ordersPage');

test('Purchase item', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = creds.email
    const password = creds.clientPassword;

    await page.goto('https://rahulshettyacademy.com/client');
    const login = new loginPage(page);
    await login.login(email, password);
    await login.waitForPageLoad();

    const dashboard = new dashboardPage(page);
    const productName = 'ZARA COAT 3';
    await dashboard.addProductToCart(productName);

    const navigateButtonsInstance = new navigateButtons(page);
    await navigateButtonsInstance.clickCartButton();

    const myCart = new myCartPage(page);

    // Verify the selected item is in the cart, then proceed to checkout.
    await myCart.purchaseItem(productName);

    const payment = new paymentsPage(page);
    await payment.fillPaymentDetails();
    await expect(payment.emailDisplay).toHaveText(email);
    await payment.submitOrder();


   //Confirm the order placement and extract order id 

   const orderConfirmation = new orderConfirmationPage(page);
   const orderConfirmationMessage = await orderConfirmation.getOrderConfirmationMessage();
   const orderId = await orderConfirmation.getOrderId();

   expect(orderConfirmationMessage).toBe(' Thankyou for the order. ');


const ordersPageInstance = new ordersPage(page);
await navigateButtonsInstance.openOrders();
await ordersPageInstance.viewOrder(orderId);

const orderVerify = await ordersPageInstance.getOrderDetails();
expect(orderVerify.includes(orderId)).toBeTruthy();
})
