const { test, expect } = require("@playwright/test");

test.describe("More Validations", () => {
  test.describe.configure({ mode: "parallel" });

  // run tests in this describe block in parallel
  test("Popup Validation", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // validating hidden fields
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // handling pop ups
    page.on("dialog", (dialog) => dialog.accept());
    await page.locator("#confirmbtn").click();

    // mouse hover
    await page.locator("#mousehover").hover();
    await page.getByRole("link", { name: "Reload" });
  });

  test("Back And Forth On the browser", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();
  });

  test("Handling Frames", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //Handling frames
    const framesPage = page.frameLocator("#courses-iframe");
    // await framesPage.locator()
    await framesPage.getByRole("link", { name: "NEW All Access plan" }).click();

    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
  });
});
