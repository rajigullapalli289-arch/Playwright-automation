const { test, expect, request } = require('@playwright/test');
const {apiUtils} = require('./utils/apiUtils');

let response;

const loginPayload = { userEmail: "rajigullapalli289@gmail.com", userPassword: "testCl!3nt" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtil = new apiUtils(apiContext, loginPayload);
    response = await apiUtil.createOrder(orderPayload);
})

test('Login with api token', async ({ page }) => {


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

   await page.goto('https://rahulshettyacademy.com/client/');
    await page.reload();


    //click on orders and verify current order is present in the list 

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();

    const rows = page.locator('tbody tr');
    // Finds the exact row containing your order ID and clicks its view button directly
    await rows.filter({ has: page.locator('th'), hasText: response.orderId })
        .locator('.btn-primary')
        .click();

    await expect(page.locator(".col-text")).toContainText(response.orderId);

})

