const {test,expect} = require("@playwright/test")
const creds = require('../utils/env');

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

    // add product to cart 
    // const productList = await page.locator('.card-body').first().textContent();
    // const allProducts = await page.locator('.card-body b').allTextContents();
    // console.log(allProducts);

    const allProducts = await page.locator('.card-body')
    const productCount = await allProducts.count();
    const productName = 'iphone 13 pro'
    
    for(let i=0 ; i < productCount; i++){
        if(await allProducts.nth(i).locator('b').textContent() === productName) {
            await allProducts.nth(i).locator('text =  Add To Cart').click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    const productThere = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(productThere).toBeTruthy();

    //checkout 

    await page.locator("button:has-text('Checkout')").click();

    // 4508 7500 1574 1019

    // adding card information

    await page.locator('.field .input.txt.text-validated').fill('4508 7500 1574 1019');
    const expiryMonth = page.locator('select.input.ddl').nth(0);
    await expiryMonth.selectOption('04')

    const expiryYear = page.locator('select.input.ddl').nth(1);
    await expiryYear.selectOption('15');


   // Find the input field relative to the CVV text container
   await page.locator('.field:has-text("CVV Code") input').fill('444');
 
   // Find the Name on Card input relative to its label container
  await page.locator('.field:has-text("Name on Card") input').fill('XYZ');

   //verify email is correct
   expect(await page.locator('.user__name [type="text"]').first()).toHaveText(email)


    //selecting country from the suggestive dropdown
      await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   //placing order 
   await page.locator('.action__submit').click();


   //Confirm the order placement and extract order id 

   expect(await page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

   const orderId = await page.locator('label.ng-star-inserted').textContent();
//    console.log(orderId);

  const orderValue = orderId.split('|')[1].trim();
//    console.log(orderValue);

//click on orders and verify current order is present in the list 

 await page.locator("button[routerlink*='myorders']").click();
 await page.locator('tbody').waitFor();

 const rows = await page.locator('tbody tr');

 //below function can be performed both ways with For loop and or using the has text locator 

//  const rowCount = await rows.count();

//  for (let i=0 ; i<rowCount; ++i)
//     {
//      const orderDetails = await rows.nth(i).locator('th').textContent();
//      if(orderDetails.includes(orderValue)){
//         await page.locator('.btn-primary').first().click();
//         break;
//      }
//     }
//   const orderVerify = await page.locator(".col-text").textContent();

//   expect(orderVerify.includes(orderValue)).toBeTruthy();

// Finds the exact row containing your order ID and clicks its view button directly
await rows.filter({ has: page.locator('th'), hasText: orderValue })
          .locator('.btn-primary')
          .click();

const orderVerify = await page.locator(".col-text").textContent();
expect(orderVerify.includes(orderValue)).toBeTruthy();
})
