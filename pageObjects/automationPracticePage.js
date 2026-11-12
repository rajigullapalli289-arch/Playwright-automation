class automationPracticePage {
    constructor(page) {
        this.page = page;
        this.radioButtons = page.locator('input[name="radioButton"]');
        this.countryInput = page.locator('#autocomplete');
        this.countrySuggestions = page.locator('#ui-id-1');
        this.dropdown = page.locator('#dropdown-class-example');
        this.checkboxes = page.locator('input[type="checkbox"]');
        this.openWindowButton = page.locator('#openwindow');
        this.openTabLink = page.locator('#opentab');
        this.nameInput = page.locator('#name');
        this.alertButton = page.locator('#alertbtn');
        this.confirmButton = page.locator('#confirmbtn');
        this.courseTable = page.locator('#product');
        this.hideButton = page.locator('#hide-textbox');
        this.showButton = page.locator('#show-textbox');
        this.displayedTextInput = page.locator('#displayed-text');
        this.mouseHoverButton = page.locator('#mousehover');
        this.courseFrame = page.frameLocator('#courses-iframe');
    }

    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/AutomationPractice/#top');
    }

    async selectCountry(countryPrefix, country) {
        await this.countryInput.fill(countryPrefix);
        await this.countrySuggestions.getByText(country, { exact: true }).click();
    }

    async openWindow() {
        const popupPromise = this.page.waitForEvent('popup');
        await this.openWindowButton.click();
        return popupPromise;
    }

    async openTab() {
        const popupPromise = this.page.waitForEvent('popup');
        await this.openTabLink.click();
        return popupPromise;
    }

    async triggerDialog(button) {
        const dialogPromise = this.page.waitForEvent('dialog').then(async (dialog) => {
            const details = {
                type: dialog.type(),
                message: dialog.message(),
            };
            await dialog.accept();
            return details;
        });

        await button.click();
        return dialogPromise;
    }
}

module.exports = { automationPracticePage };
