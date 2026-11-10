const base = require("@playwright/test");

export const test = base.test.extend({
  products: { productName: "ZARA COAT 3" },
});
