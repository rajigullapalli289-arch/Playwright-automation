class apiUtils {
  constructor(apiContext,loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;

  }

  async getToken() {
    //login API
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      },
    );
    const jsonResponse = await loginResponse.json();
    return jsonResponse.token;
  }

  async createOrder(orderPayload) {
    //Order API
    const token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    const jsonResponeOrder = await orderResponse.json();
    return {
      token,
      orderId: jsonResponeOrder.orders[0],
    };
  }
}

module.exports = {apiUtils};
