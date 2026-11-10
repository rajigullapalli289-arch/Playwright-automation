class navigateButtons {
    constructor(page) {
        this.page = page;
        this.cartButton = page.locator("[routerlink*='cart']");
        this.ordersButton = page.locator("button[routerlink*='myorders']");
        this.ordersTable = page.locator('tbody');
    }

    async gotoUrl(){
        await this.page.goto('https://rahulshettyacademy.com/client');
    }
       async clickCartButton() {
        await this.cartButton.click();
    }

       async openOrders() {
        await this.ordersButton.click();
        await this.ordersTable.waitFor();
    }
}

module.exports = { navigateButtons };