const { expect } = require('@playwright/test');

class paymentsPage {
    constructor(page) {
        this.page = page;
        this.cardNumberInput = page.locator('.field .input.txt.text-validated');
        this.expiryMonthSelect = page.locator('select.input.ddl').nth(0);
        this.expiryYearSelect = page.locator('select.input.ddl').nth(1);
        this.cvvInput = page.locator('.field:has-text("CVV Code") input');
        this.nameOnCardInput = page.locator('.field:has-text("Name on Card") input');
        this.emailDisplay = page.locator('.user__name [type="text"]').first();
        this.countryInput = page.getByPlaceholder('Select Country');
        this.countryOptions = page.locator('.ta-results button');
        this.submitButton = page.locator('.action__submit');
    }

    async fillPaymentDetails() {
        await this.cardNumberInput.fill('4508 7500 1574 1019');
        await this.expiryMonthSelect.selectOption('04');
        await this.expiryYearSelect.selectOption('15');
        await this.cvvInput.fill('444');
        await this.nameOnCardInput.fill('XYZ');
        await this.countryInput.pressSequentially('ind', { delay: 150 });
        await this.countryOptions.first().waitFor();

        const optionsCount = await this.countryOptions.count();
        for (let i = 0; i < optionsCount; i++) {
            if ((await this.countryOptions.nth(i).textContent()) === ' India') {
                await this.countryOptions.nth(i).click();
                return;
            }
        }

        throw new Error('Country option "India" was not found.');
    }

    async submitOrder() {
        await this.submitButton.click();
    }

    async verifyEmail(email) {
        await expect(this.emailDisplay).toHaveText(email);
    }
}

module.exports = { paymentsPage };
