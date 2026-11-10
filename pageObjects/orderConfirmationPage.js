const { expect } = require('@playwright/test');

class orderConfirmationPage {  
    constructor(page) {
        this.page = page;
        this.orderConfirmationMessage = page.locator('.hero-primary');
        this.orderIdLabel = page.locator('label.ng-star-inserted');
    }

    async verifyOrderConfirmation() {
        await expect(this.orderConfirmationMessage).toHaveText('Thankyou for the order.');
    }

    async getOrderId() {
        const orderIdText = await this.orderIdLabel.textContent();
        return orderIdText.split('|')[1].trim();
    }
}

module.exports = { orderConfirmationPage };