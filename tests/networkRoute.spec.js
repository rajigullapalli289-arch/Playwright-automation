const { test, expect, request } = require("@playwright/test");
const { apiUtils } = require("../utils/apiUtils");
const creds = require("../utils/env");

let response;

const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};

const fakePayLoadOrders = { data: [], message: "No Orders" };

test.beforeAll(async () => {
  const loginPayload = { userEmail: creds.email, userPassword: creds.clientPassword };
  const apiContext = await request.newContext();
  const apiUtil = new apiUtils(apiContext, loginPayload);
  response = await apiUtil.createOrder(orderPayload);
});

test("Network Interception", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");

  //network route

//   tells Playwright to intercept matching requests made by this page.
  await page.route(
    // the URL pattern to intercept. ** matches any preceding URL, and * matches the customer ID or other trailing part.
    "**/api/ecom/order/get-orders-for-customer/*",
//    defines the handler Playwright runs for a matching request. It’s async because the handler uses await.
    async (route) => {
        //  sends the request to the real server and waits for its response.
      const originalResponse = await page.request.fetch(route.request());
// responds to the page using the values supplied here instead of letting the original response go through unchanged.
      await route.fulfill({
        // preserves the original response’s status and headers.
        response: originalResponse,
        // replaces its response body with the fake “No Orders” JSON. JSON.stringify converts the JavaScript object to a JSON string.
        body: JSON.stringify(fakePayLoadOrders),
      });
    },
  );
// starts waiting for the matching response. It’s intentionally set up before clicking so a quick response won’t be missed.
  const ordersResponse = page.waitForResponse(
    
    "**/api/ecom/order/get-orders-for-customer/*",
  );

//   clicks the Orders button, which triggers the request.
  await page.locator("button[routerlink*='myorders']").click();
//   waits until that response arrives before the test continues.
  await ordersResponse;

  expect (await page.locator(".mt-4")).toHaveText('You have No Orders to show at this time. Please Visit Back Us');
});
