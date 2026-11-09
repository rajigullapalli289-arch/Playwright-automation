const { expect } = require('@playwright/test');

class myCartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("button:has-text('Checkout')");
        this.cartItems = page.locator('div li');
    }

    async verifyProductInCart(productName) {
        await this.cartItems.first().waitFor();
        await expect(this.page.locator('h3').filter({ hasText: productName })).toBeVisible();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }

    async purchaseItem(productName) {
        await this.verifyProductInCart(productName);
        await this.clickCheckoutButton();
    }
}

module.exports = { myCartPage };