const base = require('@playwright/test');
const { apiUtils } = require('./apiUtils.js');
const { request } = require('@playwright/test');
const creds = require('./env');

const loginPayload = { get userEmail() { return creds.email; }, get userPassword() { return creds.clientPassword; } };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }


exports.customtest = base.test.extend(
    {
    authenticatedPage : async({browser},use)=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        const email = creds.email

        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('#userEmail').fill(email);
        await page.locator('#userPassword').fill(creds.clientPassword);

        await page.locator('#login').click();

        await page.waitForLoadState('networkidle');
        try {
            await use(page);
        } finally {
            await context.close();
        }
    },
   createOrder : async({},use)=> 
   {
    const apiContext = await request.newContext();
    const apiUtil = new apiUtils(apiContext, loginPayload);
    const response = await apiUtil.createOrder(orderPayload);
    try {
        await use(response);
    } finally {
        await apiContext.dispose();
    }
   }
}
)
