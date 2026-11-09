class orderConfirmationPage {  
    constructor(page) {
        this.page = page;
        this.orderConfirmationMessage = page.locator('.hero-primary');
        this.orderIdLabel = page.locator('label.ng-star-inserted');
    }

    async getOrderConfirmationMessage() {
        return await this.orderConfirmationMessage.textContent();
    }

    async getOrderId() {
        const orderIdText = await this.orderIdLabel.textContent();
        return orderIdText.split('|')[1].trim();
    }
}

module.exports = { orderConfirmationPage };