const creds = require('./utils/env');
const {test,expect} = require("@playwright/test")

test('Purchase item', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = creds.email

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill(creds.clientPassword);

    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    //   clicks the Orders button
  await page.locator("button[routerlink*='myorders']").click();

  // intercept request 

  await page.route("**/api/ecom/order/get-orders-details?id=*",
    // continue is for intercepting request call 
    route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aecc41692a4341c4c06100b'}));

 await page.locator("button:has-text('View')").first().click();

 await page.getByText('You are not authorize to view').isVisible();


// another way to assert the text on the page
//    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})
