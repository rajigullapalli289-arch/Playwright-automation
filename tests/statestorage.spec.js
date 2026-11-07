const creds = require('./utils/env');
const{test,expect} = require('@playwright/test');

let webContext;

test.beforeAll(async({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    const email = creds.email

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill(creds.clientPassword);

    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});

})

test('Use storage token ', async()=> {

    const page = await webContext.newPage();

     await page.goto('https://rahulshettyacademy.com/client');

    const allProducts = await page.locator('.card-body')
    const productCount = await allProducts.count();
    const productName = 'ZARA COAT 3'
    
    for(let i=0 ; i < productCount; i++){
        if(await allProducts.nth(i).locator('b').textContent() === productName) {
            await allProducts.nth(i).locator('text =  Add To Cart').click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    const productThere = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(productThere).toBeTruthy();
});

test('Second test with storage token', async()=> {

        const page = await webContext.newPage();

     await page.goto('https://rahulshettyacademy.com/client');
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
})
