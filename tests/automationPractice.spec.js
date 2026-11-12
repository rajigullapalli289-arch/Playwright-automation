const { test, expect } = require('@playwright/test');
const { poManager } = require('../pageObjects/poManager');

async function openPracticePage(page) {
    const practice = new poManager(page).getAutomationPracticePage();
    await practice.goto();
    return practice;
}

test('Select a radio button', async ({ page }) => {
    const practice = await openPracticePage(page);
    const radio2 = practice.radioButtons.nth(1);

    await radio2.check();

    await expect(radio2).toBeChecked();
});

test('Select a country from autocomplete suggestions', async ({ page }) => {
    const practice = await openPracticePage(page);

    await practice.selectCountry('Ind', 'India');

    await expect(practice.countryInput).toHaveValue('India');
});

test('Select an option from the dropdown', async ({ page }) => {
    const practice = await openPracticePage(page);

    await practice.dropdown.selectOption('option2');

    await expect(practice.dropdown).toHaveValue('option2');
});

test('Select checkboxes', async ({ page }) => {
    const practice = await openPracticePage(page);
    const option1 = practice.checkboxes.nth(0);
    const option3 = practice.checkboxes.nth(2);

    await option1.check();
    await option3.check();

    await expect(option1).toBeChecked();
    await expect(option3).toBeChecked();
});

test('Open a new window', async ({ page }) => {
    const practice = await openPracticePage(page);
    const popup = await practice.openWindow();

    await expect(popup).toHaveURL(/qaclickacademy\.com/);
    await popup.close();
});

test('Open a new tab', async ({ page }) => {
    const practice = await openPracticePage(page);
    const popup = await practice.openTab();

    await expect(popup).toHaveURL(/qaclickacademy\.com/);
    await popup.close();
});

test('Accept an alert after entering a name', async ({ page }) => {
    const practice = await openPracticePage(page);
    await practice.nameInput.fill('Playwright');

    const dialog = await practice.triggerDialog(practice.alertButton);
    expect(dialog.type).toBe('alert');
    expect(dialog.message).toContain('Playwright');
});

test('Accept a confirmation dialog', async ({ page }) => {
    const practice = await openPracticePage(page);
    await practice.nameInput.fill('Playwright');

    const dialog = await practice.triggerDialog(practice.confirmButton);
    expect(dialog.type).toBe('confirm');
    expect(dialog.message).toContain('Playwright');
});

test('Hide and show the text field', async ({ page }) => {
    const practice = await openPracticePage(page);
    await practice.displayedTextInput.fill('Test value');

    await practice.hideButton.click();
    await expect(practice.displayedTextInput).toBeHidden();

    await practice.showButton.click();
    await expect(practice.displayedTextInput).toBeVisible();
    await expect(practice.displayedTextInput).toHaveValue('Test value');
});

test('Show the mouse hover menu', async ({ page }) => {
    const practice = await openPracticePage(page);

    await practice.mouseHoverButton.hover();

    await expect(page.getByRole('link', { name: 'Reload' })).toBeVisible();
});

test('Read a course from the web table', async ({ page }) => {
    const practice = await openPracticePage(page);
    const sqlCourse = practice.courseTable.getByRole('row').filter({
        hasText: 'Learn SQL in Practical + Database Testing from Scratch',
    });

    await expect(sqlCourse).toContainText('25');
});

test('Show course content in the iframe', async ({ page }) => {
    const practice = await openPracticePage(page);

    await expect(
        practice.courseFrame.getByRole('link', { name: 'NEW All Access plan' }),
    ).toBeVisible();
});
