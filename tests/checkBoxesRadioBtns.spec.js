const {test,expect} = require('@playwright/test');

test('CheckBoxes and Radio buttons', async ({browser})=>
{
  const context =  await browser.newContext();
  const page = await context.newPage(); 

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // selecting radio buttons
await page.locator('.radiotextsty').last().click();
await page.locator('#okayBtn').click();
expect(page.locator('.radiotextsty').last().isChecked());

// selecting checkbox 
await page.locator('#terms').click();
expect(page.locator('#terms').isChecked()).toBeTruthy();

})

test('Child Window', async({browser})=>
{
    const context =  await browser.newContext();
    const page = await context.newPage(); 
    const userName = page.locator('#username');
    const passWrd = page.locator("#password");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //   await page.locator('.blinkingText').first().to

    const documentLink = page.locator("[href*= 'documents-request']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
            documentLink.click(),
        ]
    )
    const  text = await newPage.locator(".red").textContent();

    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    // console.log(domain);

    await userName.fill(domain);
    console.log(await userName.inputValue());

})