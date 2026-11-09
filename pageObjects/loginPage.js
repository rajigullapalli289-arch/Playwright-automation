class loginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('#userEmail');
        this.passwordInput = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { loginPage };