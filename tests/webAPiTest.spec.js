const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "rajigullapalli289@gmail.com", userPassword: "testCl!3nt" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }

let loginToken
let orderId

test.beforeAll(async () => {
    const apiContext = await request.newContext();

    //login API
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: loginPayload
    })
    expect(loginResponse.ok()).toBeTruthy();
    const jsonResponse = await loginResponse.json();
    loginToken = jsonResponse.token;

    //Order API
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: orderPayload,
        headers: {
            'Authorization': loginToken,
            'ContentType': 'application/json'
        }
    });
    const jsonResponeOrder = await orderResponse.json();
    orderId = jsonResponeOrder.orders[0];
})

test.only('Login with api token', async ({ page }) => {
   
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, loginToken);

   await page.goto('https://rahulshettyacademy.com/client/');
    await page.reload();


    //click on orders and verify current order is present in the list 

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();
    await page.pause();

    const rows = await page.locator('tbody tr');
    // Finds the exact row containing your order ID and clicks its view button directly
    await rows.filter({ has: page.locator('th'), hasText: orderId })
        .locator('.btn-primary')
        .click();

    const orderVerify = await page.locator(".col-text").textContent();
    expect(orderVerify.includes(orderId)).toBeTruthy();

})



