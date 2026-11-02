const {test, expect} = require('@playwright/test');

test('First Test', async ({browser})=>
{
  const context =  await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator('#user-name');
  const passWrd = page.locator("[type='password']");
  const loginBtn = page.locator('#login-button');
  const inventoryList = page.locator('.inventory_item_name')

  await page.goto('https://www.saucedemo.com');
    console.log (await page.title());
    await userName.fill('');
    await passWrd.fill('');
    await loginBtn.click();
    console.log(await page.locator("[data-test='error']").textContent());
    await expect(page.locator("[data-test='error']")).toContainText('Epic sadface: Username is required');
    await userName.fill('standard_user');
    await passWrd.fill('secret_sauce');
    await loginBtn.click();
    // not ideal to use first()  or nth() for the the elements to load , then we can use waitForLoadState(). 
    // console.log(await inventoryList.first().textContent());
    // console.log(await inventoryList.nth(4).textContent());

    //Recently waitForLoadState('networkidle') is also flaky. so use waitFor()
    // await page.waitForLoadState('networkidle');

    await page.locator('.inventory_list a').first().waitFor()

    const listValues = await page.locator('.inventory_list a').allTextContents();
    console.log(listValues);


});

test.skip('First Test - w/o Browser COntext', async ({page})=>
{
  await page.goto('https://www.google.com');
  console.log (await page.title());
  await expect(page).toHaveTitle("Google");
});