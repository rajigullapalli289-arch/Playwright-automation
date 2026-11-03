const { test, expect } = require("@playwright/test");
const email = 'rajigullapalli289@gmail.com';
const password = 'testD@ta9'

export async function loginAndGoToBooking(page,emailid,passwrd)
{
  await page.goto("https://eventhub.rahulshettyacademy.com");
  await page.getByLabel("Email").fill(emailid);
  await page.getByLabel("Password").fill(passwrd);

  await page.locator("#login-btn").click();
  await page.locator("[href*=bookings]").first().waitFor();
  const elementVisible =  await page.getByText('Browse Events →').isVisible();
  expect(elementVisible).toBeTruthy();
};

test("Single ticket booking is eligible for refund", async ({ browser }) => {

const context =  await browser.newContext();
const page = await context.newPage(); 

//step 1 : Login
await loginAndGoToBooking(page, email, password);

// Step 2 — Book first event with 1 ticket (default)

// - Navigate to /events
await page.locator("[href='/events']").first().click();

// - Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")
await page.locator('[data-testid="event-card"]').first().locator('[data-testid="book-now-btn"]').click();

// - Fill Full Name, Email (your email), Phone
await page.getByLabel('Full Name').fill('test event');
await page.getByLabel('Email').fill('test@test.com');

await page.getByLabel('Phone Number').fill('2224447890');

// - Click confirm button (.confirm-booking-btn)
await page.locator('.confirm-booking-btn').click();

// Step 3 — Navigate to booking detail

// - Click View My Bookings link
await page.getByRole('button', { name: 'View My Bookings' }).click();

// - Assert URL is /bookings
await page.waitForURL('**/bookings');
await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');


// - Click the first View Details link
await page.locator('#booking-card [type="button"]').filter({ hasText: 'View Details' }).first().click();

// - Assert: text Booking Information is visible on the page
await expect(page.getByRole('heading', { name: 'Booking Information' })).toBeVisible();

// Step 4 — Validate booking ref

// - Read booking ref from page
const bookingRef = await page.locator('.flex-wrap .font-mono').textContent();

// - Read event title from h1
const eventTitle = await page.locator('h1').textContent();

// - Assert validation : "first character of booking ref equals first character of event title"
expect(bookingRef.slice(0,1)).toBe(eventTitle.slice(0,1));


// Step 5 — Check refund eligibility

// - Click the Check Refund Eligibility button
await page.locator('#check-refund-btn').click();

// - Assert: spinner element (#refund-spinner) is immediately visible
const spinner = page.locator('#refund-spinner');
await expect(spinner).toBeVisible();

// - Assert: spinner is no longer visible within 6 seconds
await expect(spinner).toBeHidden({ timeout: 6000 });

// Step 6 — Validate result

// - Locate result element by id #refund-result
const refundResult = page.locator('#refund-result');

// - Assert it is visible
await expect(refundResult).toBeVisible();

// - Assert it contains text Eligible for refund
await expect(refundResult).toContainText('Eligible');

// - Assert it contains text Single-ticket bookings qualify for a full refund
await expect(refundResult).toContainText('Single-ticket bookings qualify for a full refund.');

});

test.only("Group ticket booking is NOT eligible for refund", async ({ browser }) => {

// Steps 1–2 — Same as Test 1, except after navigating to the event detail page, click the + button twice to increase quantity to 3 before filling the form

const context =  await browser.newContext();
const page = await context.newPage(); 

//step 1 : Login
await loginAndGoToBooking(page, email, password);

// Step 2 — Book first event with 1 ticket (default)

// - Navigate to /events
await page.locator("[href='/events']").first().click();

// - Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")
await page.locator('[data-testid="event-card"]').first().locator('[data-testid="book-now-btn"]').click();

// - Locate the increment button with button:has-text("+") and click it twice
await page.getByRole('button', { name: '+' }).dblclick();

// - Fill Full Name, Email (your email), Phone
await page.getByLabel('Full Name').fill('test event');
await page.getByLabel('Email').fill('test@test.com');

await page.getByLabel('Phone Number').fill('2224447890');

// - Click confirm button (.confirm-booking-btn)
await page.locator('.confirm-booking-btn').click();

// Step 3 — Navigate to booking detail

// - Click View My Bookings link
await page.getByRole('button', { name: 'View My Bookings' }).click();

// - Assert URL is /bookings
await page.waitForURL('**/bookings');
await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');


// - Click the first View Details link
await page.locator('#booking-card [type="button"]').filter({ hasText: 'View Details' }).first().click();

// - Assert: text Booking Information is visible on the page
await expect(page.getByRole('heading', { name: 'Booking Information' })).toBeVisible();

// Step 4 — Validate booking ref

// - Read booking ref from page
const bookingRef = await page.locator('.flex-wrap .font-mono').textContent();

// - Read event title from h1
const eventTitle = await page.locator('h1').textContent();

// - Assert validation : "first character of booking ref equals first character of event title"
expect(bookingRef.slice(0,1)).toBe(eventTitle.slice(0,1));


// Step 5 — Check refund eligibility

// - Click the Check Refund Eligibility button
await page.locator('#check-refund-btn').click();

// - Assert: spinner element (#refund-spinner) is immediately visible
const spinner = page.locator('#refund-spinner');
await expect(spinner).toBeVisible();

// - Assert: spinner is no longer visible within 6 seconds
await expect(spinner).toBeHidden({ timeout: 6000 });

// Step 6 — Validate result (different assertions)

// - Locate result element by id #refund-result
const refundResult = page.locator('#refund-result');

// - Assert result contains Not eligible for refund
await expect(refundResult).toContainText('Not eligible');

// - Assert result contains Group bookings (3 tickets) are non-refundable
await expect(refundResult).toContainText('Group bookings (3 tickets) are non-refundable.');

});

