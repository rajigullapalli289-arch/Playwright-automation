class dashboardPage {
    constructor(page) {
        this.page = page;
        this.cardBody = page.locator('.card-body');
        this.cartButton = page.locator("[routerlink*='cart']");
   

    }

 

    async addProductToCart(productName) {
        const productCard = this.cardBody.filter({ hasText: productName });
        const productCount = await productCard.count();

        for (let i = 0; i < productCount; i++) {
            if ((await productCard.nth(i).locator('b').textContent())?.trim() === productName) {
                await productCard.nth(i).getByText('Add To Cart', { exact: true }).click();
                return;
            }
        }

        throw new Error(`Product "${productName}" was not found on the dashboard.`);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { dashboardPage };