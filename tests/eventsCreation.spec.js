const creds = require('./utils/env');
const {test,expect} = require('@playwright/test');
const nowDate = Date.now();
let eventTitle = 'Test Event' + nowDate;
let eventDescription = "Test Event creation"

function futureDate() {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

const futureDateValue = futureDate();

test('Event Creation', async ({browser})=>
{
  const context =  await browser.newContext();
  const page = await context.newPage(); 

  await page.goto('https://eventhub.rahulshettyacademy.com');

  //Step 1:  login
  await page.getByLabel('Email').fill(creds.email);
  await page.getByLabel('Password').fill(creds.eventhubPassword);

  await page.locator('#login-btn').click();
  await page.locator('[href*=bookings]').first().waitFor();
  const elementVisible =  await page.getByText('Browse Events →').isVisible();
   expect(elementVisible).toBeTruthy();


//    Step 2 — Create a new event
await page.locator("[href='/admin/events']").first().click();
await page.locator('#event-title-input').fill(eventTitle);
await page.locator('#admin-event-form textarea').fill(eventDescription);
const category = await page.locator('#category');
await category.selectOption('Sports');
await page.getByLabel('City').fill('Atlanta');
await page.locator('#venue').fill('Test Venue , 2344 madison square');
await page.locator('[id="price-($)"]').fill('100');
await page.getByLabel('Total Seats').fill('25');
await page.locator('[id="event-date-&-time"]').fill(futureDateValue);
await page.locator('[id="add-event-btn"]').click();

await expect(page.getByText('Event created!')).toBeVisible();


// Step 3 — Find the event card and capture seats

// - Navigate to /events
await page.locator("[href='/events']").first().click();

// - Get all event cards (locate by data-testid="event-card")
const allEvents = await page.locator('[data-testid="event-card"]').allTextContents();

// - Assert the first card is visible (confirms page loaded)
await page.locator('[data-testid="event-card"]').isVisible();

// - From all cards, filter for the one that contains your event title text
// expect(allEvents.includes(eventTitle)).toBeTruthy();

// - Assert the matched card is visible (timeout 5 seconds)
await expect(page.getByText(eventTitle)).toBeVisible({ timeout: 5000 });

// - Read the seat count text from that card (locate element containing text seat, parse integer from its inner text) — store this as seatsBeforeBooking
const eventCard = page.locator('[data-testid="event-card"]').filter({ hasText: eventTitle });

const seatText = await eventCard.getByText(/seats?/i).innerText();
const seatsBeforeBooking = Number(seatText.match(/\d+/)?.[0]);


// Step 4 — Start booking
// - On the matched event card, click the Book Now button (locate by data-testid="book-now-btn" inside the card)
await page.locator('[data-testid="event-card"]').filter({ hasText: eventTitle }).locator('#book-now-btn').click();


// Step 5 — Fill booking form

// - Assert: element with id #ticket-count has text 1 (default quantity)
const defaultValue = await page.locator('#ticket-count').textContent();
expect(defaultValue.includes(1)).toBeTruthy();

// - Fill Full Name (locate by label Full Name)
await page.getByLabel('Full Name').fill('Tim Test');

// - Fill Email (locate by id #customer-email)
await page.locator('#customer-email').fill('test@test.com');

// - Fill Phone (locate by placeholder +91 98765 43210)
await page.getByPlaceholder("+91 98765 43210").fill('2224447890')

// - Click the confirm button (locate by CSS class .confirm-booking-btn)
await page.locator('.confirm-booking-btn').click();





// Step 6 — Verify booking confirmation

// - Locate the booking reference element (locate by CSS class .booking-ref, take .first())
// - Assert it is visible
await page.locator('.booking-ref').first().isVisible();

// - Read its inner text, trim it — store as bookingRef
const bookingRef = await page.locator('.booking-ref').textContent();



// Step 7 — Verify in My Bookings

// - Click the link View My Bookings
await page.getByRole('button', { name: 'View My Bookings' }).click();

// - Assert: URL is BASE_URL/bookings
await page.waitForURL('**/bookings');

// 2. Assert the exact URL
await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');


// - Get all booking cards (locate by id #booking-card)
// await page.locator('#booking-card').allTextContents();

// - Assert the first booking card is visible
await expect(page.locator('#booking-card').first()).toBeVisible();


// - Filter booking cards for the one that contains an element with class .booking-ref matching your bookingRef text
const matchedCard = page.locator('#booking-card').filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });
// - Assert that matched card is visible
await expect(matchedCard).toBeVisible();

// - Assert that matched card contains your eventTitle text
await expect(matchedCard).toContainText(eventTitle);


// Step 8 — Verify seat reduction

// - Navigate back to /events
await page.locator('a').filter({ hasText: 'Events' }).first().click();

// - Assert the first event card is visible
await expect(page.locator('.flex').first()).toBeVisible();

// - Filter cards again using hasText: eventTitle
// - Assert the card is visible
await expect(page.locator('h3').filter({ hasText: eventTitle })).toBeVisible();


// - Read the seat count text again (same as Step 3) — store as seatsAfterBooking
const eventCardAfter = page.locator('[data-testid="event-card"]').filter({ hasText: eventTitle });

const seatTextAfter = await eventCardAfter.getByText(/seats?/i).innerText();
const seatsAfterBooking = Number(seatTextAfter.match(/\d+/)?.[0]);
console.log(seatsAfterBooking);

// - Assert: seatsAfterBooking === seatsBeforeBooking - 1
expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

})
