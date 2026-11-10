const { loginPage } = require('./loginPage');
const { dashboardPage } = require('./dashboardPage');
const { navigateButtons } = require('./navigateButtons');
const { myCartPage } = require('./myCartPage');
const { paymentsPage } = require('./paymentsPage');
const { orderConfirmationPage } = require('./orderConfirmationPage');
const { ordersPage } = require('./ordersPage');

class poManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new loginPage(page);
        this.dashboardPage = new dashboardPage(page);
        this.navigateButtons = new navigateButtons(page);
        this.myCartPage = new myCartPage(page);
        this.paymentsPage = new paymentsPage(page);
        this.orderConfirmationPage = new orderConfirmationPage(page);
        this.ordersPage = new ordersPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getNavigateButtons() {
        return this.navigateButtons;
    }

    getOrdersPage() {
        return this.ordersPage;
    }   

    getOrderConfirmationPage() {
        return this.orderConfirmationPage;
    }

    getMyCartPage() {
        return this.myCartPage;
    }

    getPaymentsPage() {
        return this.paymentsPage;
    }


}

module.exports = { poManager };