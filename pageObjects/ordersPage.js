const { expect } = require('@playwright/test');

class ordersPage {
    constructor(page) {
        this.page = page;
        this.ordersButton = page.locator("button[routerlink*='myorders']");
        this.ordersTable = page.locator('tbody');
        this.orderDetails = page.locator('.col-text');
    }


    async viewOrder(orderId) {
        const orderRow = this.ordersTable.locator('tr').filter({
            has: this.page.locator('th'),
            hasText: orderId,
        });
        await orderRow.locator('.btn-primary').click();
    }

    async verifyOrderDetails(orderId) {
        await expect(this.orderDetails).toContainText(orderId);
    }
}

module.exports = { ordersPage };